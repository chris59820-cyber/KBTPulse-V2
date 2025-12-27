import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { SiteFloor } from './site-floor.entity';

@Entity('site_equipments')
export class SiteEquipment extends BaseEntity {
  @Column()
  floorId: string;

  @ManyToOne(() => SiteFloor, (floor) => floor.equipments)
  @JoinColumn({ name: 'floorId' })
  floor: SiteFloor;

  @Column()
  name: string;
}

