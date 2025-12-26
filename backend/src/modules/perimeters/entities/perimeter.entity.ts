import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';

@Entity('perimeters')
export class Perimeter extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'text' })
  address: string; // Adresse complète (pour compatibilité)

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

  @Column({ nullable: true })
  workingHours?: string;

  @Column({ type: 'text', nullable: true })
  receptionHours?: string; // JSON {start: "08:00", end: "17:00"}

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ nullable: true, default: 'Europe/Paris' })
  timezone?: string;

  @Column({ nullable: true, default: 'DD/MM/YYYY' })
  dateFormat?: string;

  @Column({ nullable: true, default: 'EUR' })
  currency?: string;

  @Column({ nullable: true, default: 'fr' })
  language?: string;

  @OneToMany(() => User, (user) => user.perimeter)
  users?: User[];
}
