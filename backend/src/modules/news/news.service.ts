import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { promises as fs } from 'fs';
import { join } from 'path';
import { News, NewsCategory } from './entities/news.entity';
import { SecurityAlert } from './entities/security-alert.entity';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { CreateSecurityAlertDto } from './dto/create-security-alert.dto';

@Injectable()
export class NewsService {
  private readonly storagePath: string;

  constructor(
    @InjectRepository(News)
    private newsRepository: Repository<News>,
    @InjectRepository(SecurityAlert)
    private securityAlertRepository: Repository<SecurityAlert>,
    private configService: ConfigService,
  ) {
    this.storagePath =
      this.configService.get<string>('STORAGE_PATH', './storage') ||
      './storage';
    this.ensureStorageDirectory();
  }

  private async ensureStorageDirectory() {
    const dirs = [
      join(this.storagePath, 'news', 'images'),
      join(this.storagePath, 'news', 'documents'),
    ];
    for (const dir of dirs) {
      try {
        await fs.mkdir(dir, { recursive: true });
      } catch (error) {
        // Le dossier existe déjà
      }
    }
  }

  private async saveFiles(files?: any[]): Promise<{ images: string[]; documents: string[] }> {
    const images: string[] = [];
    const documents: string[] = [];

    if (!files || files.length === 0) {
      return { images, documents };
    }

    for (const file of files) {
      const isImage = file.mimetype.startsWith('image/');
      const isPdf = file.mimetype === 'application/pdf';

      if (!isImage && !isPdf) {
        throw new BadRequestException(`Type de fichier non supporté: ${file.mimetype}`);
      }

      const fileName = `${Date.now()}-${file.originalname}`;
      const subDir = isImage ? 'news/images' : 'news/documents';
      const filePath = join(this.storagePath, subDir, fileName);
      const relativePath = `${subDir}/${fileName}`;

      await fs.writeFile(filePath, file.buffer);

      if (isImage) {
        images.push(relativePath);
      } else {
        documents.push(relativePath);
      }
    }

    return { images, documents };
  }

  async createNews(createNewsDto: CreateNewsDto, files?: any[]): Promise<News> {
    const { images, documents } = await this.saveFiles(files);

    // Si des images existent déjà dans le DTO, les fusionner
    let allImages: string[] = [];
    if (createNewsDto.images) {
      try {
        allImages = JSON.parse(createNewsDto.images);
      } catch {
        allImages = [];
      }
    }
    allImages = [...allImages, ...images];

    // Si des documents existent déjà dans le DTO, les fusionner
    let allDocuments: string[] = [];
    if (createNewsDto.documents) {
      try {
        allDocuments = JSON.parse(createNewsDto.documents);
      } catch {
        allDocuments = [];
      }
    }
    allDocuments = [...allDocuments, ...documents];

    // Définir l'image principale si disponible
    const mainImage = allImages.length > 0 ? allImages[0] : createNewsDto.image;

    const news = this.newsRepository.create({
      ...createNewsDto,
      image: mainImage,
      images: allImages.length > 0 ? JSON.stringify(allImages) : undefined,
      documents: allDocuments.length > 0 ? JSON.stringify(allDocuments) : undefined,
      publishedAt: createNewsDto.publishedAt || new Date(),
    });
    return this.newsRepository.save(news);
  }

  async findOne(id: string): Promise<News> {
    const news = await this.newsRepository.findOne({
      where: { id },
      relations: ['perimeter', 'worksite'],
    });
    if (!news) {
      throw new NotFoundException(`News with ID ${id} not found`);
    }
    return news;
  }

  async updateNews(id: string, updateNewsDto: UpdateNewsDto, files?: any[]): Promise<News> {
    const news = await this.findOne(id);
    const { images: newImages, documents: newDocuments } = await this.saveFiles(files);

    // Utiliser les images du DTO si fournies, sinon garder les existantes
    let allImages: string[] = [];
    if (updateNewsDto.images) {
      try {
        allImages = JSON.parse(updateNewsDto.images);
      } catch {
        // Si le parsing échoue, essayer de récupérer les images existantes
        if (news.images) {
          try {
            allImages = JSON.parse(news.images);
          } catch {
            allImages = [];
          }
        }
      }
    } else if (news.images) {
      try {
        allImages = JSON.parse(news.images);
      } catch {
        allImages = [];
      }
    }
    // Ajouter les nouvelles images uploadées
    allImages = [...allImages, ...newImages];

    // Utiliser les documents du DTO si fournis, sinon garder les existants
    let allDocuments: string[] = [];
    if (updateNewsDto.documents) {
      try {
        allDocuments = JSON.parse(updateNewsDto.documents);
      } catch {
        // Si le parsing échoue, essayer de récupérer les documents existants
        if (news.documents) {
          try {
            allDocuments = JSON.parse(news.documents);
          } catch {
            allDocuments = [];
          }
        }
      }
    } else if (news.documents) {
      try {
        allDocuments = JSON.parse(news.documents);
      } catch {
        allDocuments = [];
      }
    }
    // Ajouter les nouveaux documents uploadés
    allDocuments = [...allDocuments, ...newDocuments];

    // Mettre à jour l'image principale si nécessaire
    const mainImage = allImages.length > 0 ? allImages[0] : (updateNewsDto.image || news.image);

    Object.assign(news, {
      ...updateNewsDto,
      image: mainImage,
      images: allImages.length > 0 ? JSON.stringify(allImages) : (news.images || undefined),
      documents: allDocuments.length > 0 ? JSON.stringify(allDocuments) : (news.documents || undefined),
    });

    return this.newsRepository.save(news);
  }

  async removeNews(id: string): Promise<void> {
    const news = await this.findOne(id);
    news.isActive = false;
    await this.newsRepository.save(news);
  }

  async findAllNews(filters?: {
    perimeterId?: string;
    worksiteId?: string;
    category?: NewsCategory;
  }): Promise<News[]> {
    const where: any = { isActive: true };
    if (filters?.perimeterId) where.perimeterId = filters.perimeterId;
    if (filters?.worksiteId) where.worksiteId = filters.worksiteId;
    if (filters?.category) where.category = filters.category;

    return this.newsRepository.find({
      where,
      relations: ['perimeter', 'worksite'],
      order: { publishedAt: 'DESC' },
    });
  }

  async createSecurityAlert(
    createAlertDto: CreateSecurityAlertDto,
  ): Promise<SecurityAlert> {
    const alert = this.securityAlertRepository.create(createAlertDto);
    return this.securityAlertRepository.save(alert);
  }

  async findAllSecurityAlerts(perimeterId?: string): Promise<SecurityAlert[]> {
    const where: any = { isActive: true };
    if (perimeterId) where.perimeterId = perimeterId;

    const now = new Date();
    return this.securityAlertRepository
      .createQueryBuilder('alert')
      .where('alert.isActive = :isActive', { isActive: true })
      .andWhere(
        '(alert.expiresAt IS NULL OR alert.expiresAt > :now)',
        { now },
      )
      .andWhere(perimeterId ? 'alert.perimeterId = :perimeterId' : '1=1', {
        perimeterId,
      })
      .orderBy('alert.severity', 'DESC')
      .addOrderBy('alert.createdAt', 'DESC')
      .getMany();
  }
}

