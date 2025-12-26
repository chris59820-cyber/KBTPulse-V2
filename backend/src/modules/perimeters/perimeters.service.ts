import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Perimeter } from './entities/perimeter.entity';
import { CreatePerimeterDto } from './dto/create-perimeter.dto';
import { UpdatePerimeterDto } from './dto/update-perimeter.dto';

@Injectable()
export class PerimetersService {
  constructor(
    @InjectRepository(Perimeter)
    private perimeterRepository: Repository<Perimeter>,
  ) {}

  async create(createPerimeterDto: CreatePerimeterDto): Promise<Perimeter> {
    const perimeter = this.perimeterRepository.create(createPerimeterDto);
    return this.perimeterRepository.save(perimeter);
  }

  async findAll(): Promise<Perimeter[]> {
    return this.perimeterRepository.find({
      relations: ['users'],
    });
  }

  async findOne(id: string): Promise<Perimeter> {
    const perimeter = await this.perimeterRepository.findOne({
      where: { id },
      relations: ['users'],
    });
    if (!perimeter) {
      throw new NotFoundException(`Perimeter with ID ${id} not found`);
    }
    return perimeter;
  }

  async update(
    id: string,
    updatePerimeterDto: UpdatePerimeterDto,
  ): Promise<Perimeter> {
    const perimeter = await this.findOne(id);
    Object.assign(perimeter, updatePerimeterDto);
    return this.perimeterRepository.save(perimeter);
  }

  async remove(id: string): Promise<void> {
    const perimeter = await this.findOne(id);
    await this.perimeterRepository.remove(perimeter);
  }
}
