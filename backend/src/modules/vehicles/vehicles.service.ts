import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
  ) {}

  async create(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    const vehicle = this.vehicleRepository.create(createVehicleDto);
    return this.vehicleRepository.save(vehicle);
  }

  async findAll(filters?: {
    type?: string;
    assignedToUserId?: string;
    assignedToInterventionId?: string;
  }): Promise<Vehicle[]> {
    const where: any = {};
    if (filters?.type) where.type = filters.type;
    if (filters?.assignedToUserId) where.assignedToUserId = filters.assignedToUserId;
    if (filters?.assignedToInterventionId)
      where.assignedToInterventionId = filters.assignedToInterventionId;

    return this.vehicleRepository.find({
      where,
      relations: ['assignedToUser'],
      order: { registration: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Vehicle> {
    const vehicle = await this.vehicleRepository.findOne({
      where: { id },
      relations: ['assignedToUser'],
    });
    if (!vehicle) {
      throw new NotFoundException(`Vehicle with ID ${id} not found`);
    }
    return vehicle;
  }

  async findByRegistration(registration: string): Promise<Vehicle | null> {
    return this.vehicleRepository.findOne({
      where: { registration },
      relations: ['assignedToUser'],
    });
  }

  async update(id: string, updateVehicleDto: UpdateVehicleDto): Promise<Vehicle> {
    const vehicle = await this.findOne(id);
    Object.assign(vehicle, updateVehicleDto);
    return this.vehicleRepository.save(vehicle);
  }

  async remove(id: string): Promise<void> {
    const vehicle = await this.findOne(id);
    await this.vehicleRepository.remove(vehicle);
  }

  async assignToUser(
    id: string,
    userId: string | null,
    photo?: string,
    inspectionReport?: string,
  ): Promise<Vehicle> {
    const vehicle = await this.findOne(id);
    vehicle.assignedToUserId = userId;
    vehicle.assignmentDate = userId ? new Date() : undefined;
    vehicle.returnDate = userId ? undefined : new Date();
    if (photo) vehicle.photo = photo;
    if (inspectionReport) vehicle.inspectionReport = inspectionReport;
    return this.vehicleRepository.save(vehicle);
  }

  async assignToIntervention(
    id: string,
    interventionId: string | null,
  ): Promise<Vehicle> {
    const vehicle = await this.findOne(id);
    vehicle.assignedToInterventionId = interventionId;
    return this.vehicleRepository.save(vehicle);
  }
}
