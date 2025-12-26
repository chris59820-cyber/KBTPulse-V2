import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from './user.entity';

export enum ContractType {
  CDI = 'CDI',
  CDD = 'CDD',
  ETT = 'ETT',
}

@Entity('user_profiles')
export class UserProfile extends BaseEntity {
  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.profile)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ nullable: true })
  function?: string;

  @Column({ nullable: true, unique: true })
  matricule?: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true, type: 'text' })
  address?: string; // Adresse complète (pour compatibilité)

  @Column({ nullable: true, type: 'text' })
  street?: string; // Rue et numéro

  @Column({ nullable: true })
  postalCode?: string; // Code postal

  @Column({ nullable: true })
  city?: string; // Ville

  @Column({ nullable: true })
  country?: string; // Pays

  @Column({ nullable: true, type: 'date' })
  dateOfBirth?: Date;

  @Column({ nullable: true })
  photo?: string; // Chemin vers le fichier photo

  @Column({ nullable: true, type: 'date' })
  dateOfHire?: Date;

  @Column({
    type: 'text',
    enum: ContractType,
    nullable: true,
  })
  contractType?: ContractType;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  coefficient?: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  hourlyRate?: number;

  @Column({ type: 'text', nullable: true })
  skills?: string; // JSON array des compétences

  @Column({ type: 'text', nullable: true })
  emergencyContact?: string; // JSON de EmergencyContact

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  kmFromHome?: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  kmAllowance?: number;

  @Column({ type: 'text', nullable: true })
  dosimetry?: string;
}
