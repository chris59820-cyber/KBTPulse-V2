import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { promises as fs } from 'fs';
import { join } from 'path';
import { Document } from './entities/document.entity';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';

@Injectable()
export class DocumentsService {
  private readonly storagePath: string;

  constructor(
    @InjectRepository(Document)
    private documentRepository: Repository<Document>,
    private configService: ConfigService,
  ) {
    this.storagePath =
      this.configService.get<string>('STORAGE_PATH', './storage') ||
      './storage';
    this.ensureStorageDirectory();
  }

  private async ensureStorageDirectory() {
    const dirs = [
      this.storagePath,
      join(this.storagePath, 'documents'),
      join(this.storagePath, 'photos'),
      join(this.storagePath, 'signatures'),
    ];
    for (const dir of dirs) {
      try {
        await fs.mkdir(dir, { recursive: true });
      } catch (error) {
        // Le dossier existe déjà
      }
    }
  }

  async create(
    createDocumentDto: CreateDocumentDto,
    file: any,
    uploadedBy: string,
  ): Promise<Document> {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    const fileName = `${Date.now()}-${file.originalname}`;
    const subDir = this.getSubDirectory(createDocumentDto.type);
    const filePath = join(this.storagePath, subDir, fileName);

    await fs.writeFile(filePath, file.buffer);

    const document = this.documentRepository.create({
      ...createDocumentDto,
      filePath,
      fileSize: file.size,
      mimeType: file.mimetype,
      uploadedBy,
    });

    return this.documentRepository.save(document);
  }

  private getSubDirectory(type: string): string {
    if (type.includes('Photo') || type === 'Photo') {
      return 'photos';
    }
    if (type.includes('signature') || type.includes('Signature')) {
      return 'signatures';
    }
    return 'documents';
  }

  async findAll(userId?: string, interventionId?: string): Promise<Document[]> {
    const where: any = {};
    if (userId) where.userId = userId;
    if (interventionId) where.interventionId = interventionId;

    return this.documentRepository.find({
      where,
      relations: ['user', 'uploader'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Document> {
    const document = await this.documentRepository.findOne({
      where: { id },
      relations: ['user', 'uploader'],
    });
    if (!document) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }
    return document;
  }

  async update(id: string, updateDocumentDto: UpdateDocumentDto): Promise<Document> {
    const document = await this.findOne(id);
    Object.assign(document, updateDocumentDto);
    return this.documentRepository.save(document);
  }

  async remove(id: string): Promise<void> {
    const document = await this.findOne(id);
    // Supprimer le fichier
    try {
      await fs.unlink(document.filePath);
    } catch (error) {
      // Fichier déjà supprimé ou n'existe pas
    }
    await this.documentRepository.remove(document);
  }

  async findExpiringDocuments(days: number = 30): Promise<Document[]> {
    const date = new Date();
    date.setDate(date.getDate() + days);

    return this.documentRepository
      .createQueryBuilder('document')
      .where('document.expirationDate <= :date', { date })
      .andWhere('document.expirationDate >= :today', { today: new Date() })
      .getMany();
  }
}
