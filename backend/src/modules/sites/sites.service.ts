import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Site } from './entities/site.entity';
import { SiteSector } from './entities/site-sector.entity';
import { SiteUnit } from './entities/site-unit.entity';
import { SiteBuilding } from './entities/site-building.entity';
import { SiteFloor } from './entities/site-floor.entity';
import { SiteEquipment } from './entities/site-equipment.entity';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';

@Injectable()
export class SitesService {
  constructor(
    @InjectRepository(Site)
    private siteRepository: Repository<Site>,
    @InjectRepository(SiteSector)
    private sectorRepository: Repository<SiteSector>,
    @InjectRepository(SiteUnit)
    private unitRepository: Repository<SiteUnit>,
    @InjectRepository(SiteBuilding)
    private buildingRepository: Repository<SiteBuilding>,
    @InjectRepository(SiteFloor)
    private floorRepository: Repository<SiteFloor>,
    @InjectRepository(SiteEquipment)
    private equipmentRepository: Repository<SiteEquipment>,
  ) {}

  async create(createSiteDto: CreateSiteDto): Promise<Site> {
    // S'assurer que l'adresse est remplie
    if (!createSiteDto.address) {
      // Construire l'adresse à partir des champs séparés si disponible
      const parts: string[] = [];
      if (createSiteDto.street) parts.push(createSiteDto.street);
      if (createSiteDto.postalCode) parts.push(createSiteDto.postalCode);
      if (createSiteDto.city) parts.push(createSiteDto.city);
      if (createSiteDto.country) parts.push(createSiteDto.country);
      
      if (parts.length > 0) {
        createSiteDto.address = parts.join(', ');
      } else {
        createSiteDto.address = 'Adresse non renseignée';
      }
    }
    
    const site = this.siteRepository.create(createSiteDto);
    return this.siteRepository.save(site);
  }

  async findAll(): Promise<Site[]> {
    return this.siteRepository.find({
      relations: ['sectors', 'sectors.units', 'sectors.units.buildings', 'sectors.units.buildings.floors', 'sectors.units.buildings.floors.equipments'],
    });
  }

  async findOne(id: string): Promise<Site> {
    const site = await this.siteRepository.findOne({
      where: { id },
      relations: ['sectors', 'sectors.units', 'sectors.units.buildings', 'sectors.units.buildings.floors', 'sectors.units.buildings.floors.equipments'],
    });
    if (!site) {
      throw new NotFoundException(`Site with ID ${id} not found`);
    }
    return site;
  }

  async update(id: string, updateSiteDto: UpdateSiteDto): Promise<Site> {
    const site = await this.findOne(id);
    Object.assign(site, updateSiteDto);
    return this.siteRepository.save(site);
  }

  async remove(id: string): Promise<void> {
    const site = await this.findOne(id);
    await this.siteRepository.remove(site);
  }

  // Gestion de la hiérarchie
  async createSector(siteId: string, name: string): Promise<SiteSector> {
    const sector = this.sectorRepository.create({ siteId, name });
    return this.sectorRepository.save(sector);
  }

  async createUnit(sectorId: string, name: string): Promise<SiteUnit> {
    const unit = this.unitRepository.create({ sectorId, name });
    return this.unitRepository.save(unit);
  }

  async createBuilding(unitId: string, name: string): Promise<SiteBuilding> {
    const building = this.buildingRepository.create({ unitId, name });
    return this.buildingRepository.save(building);
  }

  async createFloor(buildingId: string, name: string): Promise<SiteFloor> {
    const floor = this.floorRepository.create({ buildingId, name });
    return this.floorRepository.save(floor);
  }

  async createEquipment(floorId: string, name: string): Promise<SiteEquipment> {
    const equipment = this.equipmentRepository.create({ floorId, name });
    return this.equipmentRepository.save(equipment);
  }
}
