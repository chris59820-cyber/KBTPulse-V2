import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { News, NewsCategory } from './entities/news.entity';
import { SecurityAlert } from './entities/security-alert.entity';
import { CreateNewsDto } from './dto/create-news.dto';
import { CreateSecurityAlertDto } from './dto/create-security-alert.dto';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private newsRepository: Repository<News>,
    @InjectRepository(SecurityAlert)
    private securityAlertRepository: Repository<SecurityAlert>,
  ) {}

  async createNews(createNewsDto: CreateNewsDto): Promise<News> {
    const news = this.newsRepository.create({
      ...createNewsDto,
      publishedAt: createNewsDto.publishedAt || new Date(),
    });
    return this.newsRepository.save(news);
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

