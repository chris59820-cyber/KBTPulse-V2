import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { SiteSector } from './site-sector.entity';

@Entity('sites')
export class Site extends BaseEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  sector?: string;

  @Column({ type: 'text', nullable: true })
  address?: string; // Adresse complète (pour compatibilité)

  @Column({ type: 'text', nullable: true })
  street?: string; // Rue et numéro

  @Column({ nullable: true })
  postalCode?: string; // Code postal

  @Column({ nullable: true })
  city?: string; // Ville

  @Column({ nullable: true })
  country?: string; // Pays

  @Column({ type: 'decimal', precision: 10, scale: 8, nullable: true })
  gpsLatitude?: number;

  @Column({ type: 'decimal', precision: 11, scale: 8, nullable: true })
  gpsLongitude?: number;

  @Column({ type: 'text', nullable: true })
  guardPostGps?: string; // JSON {latitude, longitude}

  @Column({ type: 'text', nullable: true })
  meetingPoints?: string; // JSON Array<{latitude, longitude}>

  @Column({ nullable: true })
  emergencyNumber?: string;

  @Column({ type: 'text', nullable: true })
  requiredDocuments?: string; // JSON array

  @Column({ type: 'text', nullable: true })
  requiredTrainings?: string; // JSON array

  @Column({ type: 'text', nullable: true })
  specificEquipment?: string; // JSON array

  @Column({ type: 'text', nullable: true })
  specificEquipmentText?: string; // Texte pour "EPI spécifiques avec zone de saisie"

  @Column({ type: 'text', nullable: true })
  otherEquipmentText?: string; // Texte pour "Autres avec zone de saisie"

  @OneToMany(() => SiteSector, (sector) => sector.site, { cascade: true })
  sectors?: SiteSector[];
}
