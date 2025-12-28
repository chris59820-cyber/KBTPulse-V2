import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { SiteUnit } from './site-unit.entity';
import { SiteFloor } from './site-floor.entity';

@Entity('site_buildings')
export class SiteBuilding extends BaseEntity {
  @Column()
  unitId: string;

  @ManyToOne(() => SiteUnit, (unit) => unit.buildings)
  @JoinColumn({ name: 'unitId' })
  unit: SiteUnit;

  @Column()
  name: string;

  @OneToMany(() => SiteFloor, (floor) => floor.building, { cascade: true })
  floors?: SiteFloor[];
}


