import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';

export enum DocumentType {
  IDENTITY = 'Carte d\'identité',
  PASSPORT = 'Passeport',
  DRIVING_LICENSE = 'Permis de conduire',
  REGISTRATION = 'Carte grise',
  MEDICAL_VISIT = 'Visite médicale',
  AUTHORIZATION = 'Habilitation',
  TRAINING = 'Formation',
  SITE_ACCESS = 'Accès site client',
  PLAN = 'Plan',
  PHOTO = 'Photo',
  PDP = 'PDP',
  MOS = 'MOS',
  RISK_ANALYSIS = 'Analyse de risques',
  SAFETY_CHECKLIST = 'Check-list sécurité',
  INTERVENTION_REPORT = 'Compte rendu d\'intervention',
  AUTO_CONTROL = 'Rapport d\'auto-contrôle',
  VEHICLE_REPORT = 'Constat de véhicule',
  OTHER = 'Autre',
}

@Entity('documents')
export class Document extends BaseEntity {
  @Column()
  name: string;

  @Column({
    type: 'text',
  })
  type: DocumentType;

  @Column()
  filePath: string; // Chemin vers le fichier dans storage/

  @Column({ type: 'integer', nullable: true })
  fileSize?: number;

  @Column({ nullable: true })
  mimeType?: string;

  @Column({ type: 'date', nullable: true })
  expirationDate?: Date;

  @Column({ nullable: true })
  userId?: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'userId' })
  user?: User;

  @Column({ nullable: true })
  interventionId?: string;

  @Column()
  uploadedBy: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'uploadedBy' })
  uploader: User;
}
