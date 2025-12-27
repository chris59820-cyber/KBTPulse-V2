import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessCode } from './entities/business-code.entity';
import { CreateBusinessCodeDto } from './dto/create-business-code.dto';
import { UpdateBusinessCodeDto } from './dto/update-business-code.dto';

@Injectable()
export class BusinessCodesService {
  constructor(
    @InjectRepository(BusinessCode)
    private businessCodeRepository: Repository<BusinessCode>,
  ) {}

  async create(createBusinessCodeDto: CreateBusinessCodeDto): Promise<BusinessCode> {
    const businessCode = this.businessCodeRepository.create({
      ...createBusinessCodeDto,
      startDate: createBusinessCodeDto.startDate ? new Date(createBusinessCodeDto.startDate) : undefined,
      endDate: createBusinessCodeDto.endDate ? new Date(createBusinessCodeDto.endDate) : undefined,
    });
    return this.businessCodeRepository.save(businessCode);
  }

  async findAll(): Promise<BusinessCode[]> {
    return this.businessCodeRepository.find({
      relations: ['rdc', 'perimeter'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<BusinessCode> {
    const businessCode = await this.businessCodeRepository.findOne({
      where: { id },
      relations: ['rdc', 'perimeter'],
    });
    if (!businessCode) {
      throw new NotFoundException(`Business code with ID ${id} not found`);
    }
    return businessCode;
  }

  async update(id: string, updateBusinessCodeDto: UpdateBusinessCodeDto): Promise<BusinessCode> {
    const businessCode = await this.findOne(id);
    const updateData: any = { ...updateBusinessCodeDto };
    if (updateBusinessCodeDto.startDate) {
      updateData.startDate = new Date(updateBusinessCodeDto.startDate);
    }
    if (updateBusinessCodeDto.endDate) {
      updateData.endDate = new Date(updateBusinessCodeDto.endDate);
    }
    Object.assign(businessCode, updateData);
    return this.businessCodeRepository.save(businessCode);
  }

  async remove(id: string): Promise<void> {
    const businessCode = await this.findOne(id);
    await this.businessCodeRepository.remove(businessCode);
  }
}

