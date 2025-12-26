import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Absence } from './entities/absence.entity';
import { CreateAbsenceDto } from './dto/create-absence.dto';
import { UpdateAbsenceDto } from './dto/update-absence.dto';
import { AbsenceStatus } from './entities/absence.entity';

@Injectable()
export class AbsencesService {
  constructor(
    @InjectRepository(Absence)
    private absenceRepository: Repository<Absence>,
  ) {}

  async create(createAbsenceDto: CreateAbsenceDto): Promise<Absence> {
    const absence = this.absenceRepository.create(createAbsenceDto);
    return this.absenceRepository.save(absence);
  }

  async findAll(userId?: string): Promise<Absence[]> {
    const where = userId ? { userId } : {};
    return this.absenceRepository.find({
      where,
      relations: ['user', 'validator'],
      order: { startDate: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Absence> {
    const absence = await this.absenceRepository.findOne({
      where: { id },
      relations: ['user', 'validator'],
    });
    if (!absence) {
      throw new NotFoundException(`Absence with ID ${id} not found`);
    }
    return absence;
  }

  async update(id: string, updateAbsenceDto: UpdateAbsenceDto): Promise<Absence> {
    const absence = await this.findOne(id);
    Object.assign(absence, updateAbsenceDto);
    return this.absenceRepository.save(absence);
  }

  async remove(id: string): Promise<void> {
    const absence = await this.findOne(id);
    await this.absenceRepository.remove(absence);
  }

  async validate(id: string, validatorId: string, approved: boolean): Promise<Absence> {
    const absence = await this.findOne(id);
    absence.status = approved ? AbsenceStatus.APPROVED : AbsenceStatus.REJECTED;
    absence.validatedBy = validatorId;
    absence.validatedAt = new Date();
    return this.absenceRepository.save(absence);
  }
}
