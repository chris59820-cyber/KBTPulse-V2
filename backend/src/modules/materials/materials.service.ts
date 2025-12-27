import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Material } from './entities/material.entity';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';

@Injectable()
export class MaterialsService {
  constructor(
    @InjectRepository(Material)
    private materialRepository: Repository<Material>,
  ) {}

  async create(createMaterialDto: CreateMaterialDto): Promise<Material> {
    const material = this.materialRepository.create(createMaterialDto);
    return this.materialRepository.save(material);
  }

  async findAll(filters?: {
    category?: string;
    state?: string;
    assignedToUserId?: string;
    assignedToInterventionId?: string;
  }): Promise<Material[]> {
    const where: any = {};
    if (filters?.category) where.category = filters.category;
    if (filters?.state) where.state = filters.state;
    if (filters?.assignedToUserId) where.assignedToUserId = filters.assignedToUserId;
    if (filters?.assignedToInterventionId)
      where.assignedToInterventionId = filters.assignedToInterventionId;

    return this.materialRepository.find({
      where,
      relations: ['assignedToUser'],
      order: { name: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Material> {
    const material = await this.materialRepository.findOne({
      where: { id },
      relations: ['assignedToUser'],
    });
    if (!material) {
      throw new NotFoundException(`Material with ID ${id} not found`);
    }
    return material;
  }

  async findByReference(reference: string): Promise<Material | null> {
    return this.materialRepository.findOne({
      where: { reference },
      relations: ['assignedToUser'],
    });
  }

  async update(
    id: string,
    updateMaterialDto: UpdateMaterialDto,
  ): Promise<Material> {
    const material = await this.findOne(id);
    Object.assign(material, updateMaterialDto);
    return this.materialRepository.save(material);
  }

  async remove(id: string): Promise<void> {
    const material = await this.findOne(id);
    await this.materialRepository.remove(material);
  }

  async assignToUser(
    id: string,
    userId: string | null,
  ): Promise<Material> {
    const material = await this.findOne(id);
    material.assignedToUserId = userId;
    return this.materialRepository.save(material);
  }

  async assignToIntervention(
    id: string,
    interventionId: string | null,
  ): Promise<Material> {
    const material = await this.findOne(id);
    material.assignedToInterventionId = interventionId;
    return this.materialRepository.save(material);
  }
}

