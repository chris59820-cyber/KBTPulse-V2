import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Site } from './site.entity';
import { SiteUnit } from './site-unit.entity';

@Entity('site_sectors')
export class SiteSector extends BaseEntity {
  @Column()
  siteId: string;

  @ManyToOne(() => Site, (site) => site.sectors)
  @JoinColumn({ name: 'siteId' })
  site: Site;

  @Column()
  name: string;

  @OneToMany(() => SiteUnit, (unit) => unit.sector, { cascade: true })
  units?: SiteUnit[];
}


