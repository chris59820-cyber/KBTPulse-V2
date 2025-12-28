import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { SiteSector } from './site-sector.entity';
import { SiteBuilding } from './site-building.entity';

@Entity('site_units')
export class SiteUnit extends BaseEntity {
  @Column()
  sectorId: string;

  @ManyToOne(() => SiteSector, (sector) => sector.units)
  @JoinColumn({ name: 'sectorId' })
  sector: SiteSector;

  @Column()
  name: string;

  @OneToMany(() => SiteBuilding, (building) => building.unit, { cascade: true })
  buildings?: SiteBuilding[];
}


