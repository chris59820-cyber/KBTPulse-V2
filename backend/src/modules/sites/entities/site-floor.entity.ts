import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { SiteBuilding } from './site-building.entity';
import { SiteEquipment } from './site-equipment.entity';

@Entity('site_floors')
export class SiteFloor extends BaseEntity {
  @Column()
  buildingId: string;

  @ManyToOne(() => SiteBuilding, (building) => building.floors)
  @JoinColumn({ name: 'buildingId' })
  building: SiteBuilding;

  @Column()
  name: string;

  @OneToMany(() => SiteEquipment, (equipment) => equipment.floor, { cascade: true })
  equipments?: SiteEquipment[];
}


