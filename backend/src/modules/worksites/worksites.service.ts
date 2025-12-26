import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Worksite } from './entities/worksite.entity';
import { CreateWorksiteDto } from './dto/create-worksite.dto';
import { UpdateWorksiteDto } from './dto/update-worksite.dto';
import { Site } from '../sites/entities/site.entity';

@Injectable()
export class WorksitesService {
  constructor(
    @InjectRepository(Worksite)
    private worksiteRepository: Repository<Worksite>,
    @InjectRepository(Site)
    private siteRepository: Repository<Site>,
  ) {}

  async create(createWorksiteDto: CreateWorksiteDto): Promise<Worksite> {
    const worksite = this.worksiteRepository.create(createWorksiteDto);
    return this.worksiteRepository.save(worksite);
  }

  async findAll(): Promise<Worksite[]> {
    return this.worksiteRepository.find({
      relations: ['rdc', 'site'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Worksite> {
    const worksite = await this.worksiteRepository.findOne({
      where: { id },
      relations: ['rdc', 'site'],
    });
    if (!worksite) {
      throw new NotFoundException(`Worksite with ID ${id} not found`);
    }
    return worksite;
  }

  async update(
    id: string,
    updateWorksiteDto: UpdateWorksiteDto,
  ): Promise<Worksite> {
    const worksite = await this.findOne(id);
    Object.assign(worksite, updateWorksiteDto);
    return this.worksiteRepository.save(worksite);
  }

  async remove(id: string): Promise<void> {
    const worksite = await this.findOne(id);
    await this.worksiteRepository.remove(worksite);
  }

  async getStatistics() {
    const worksites = await this.findAll();
    const byStatus = worksites.reduce(
      (acc, ws) => {
        acc[ws.status] = (acc[ws.status] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    return {
      total: worksites.length,
      byStatus,
      worksites,
    };
  }
}
