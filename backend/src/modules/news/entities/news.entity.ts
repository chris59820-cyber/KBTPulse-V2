import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Perimeter } from '../../perimeters/entities/perimeter.entity';
import { Worksite } from '../../worksites/entities/worksite.entity';

export enum NewsCategory {
  SAFETY = 'safety',
  ANNOUNCEMENT = 'announcement',
  EVENT = 'event',
  TRAINING = 'training',
  OTHER = 'other',
}

@Entity('news')
export class News extends BaseEntity {
  @Column()
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'text', nullable: true })
  image?: string; // Image principale (pour compatibilité)

  @Column({ type: 'text', nullable: true })
  images?: string; // JSON array d'images pour le carrousel

  @Column({ type: 'text', nullable: true })
  documents?: string; // JSON array de PDFs

  @Column({
    type: 'text',
  })
  category: NewsCategory;

  @Column({ nullable: true })
  perimeterId?: string;

  @ManyToOne(() => Perimeter, { nullable: true })
  @JoinColumn({ name: 'perimeterId' })
  perimeter?: Perimeter;

  @Column({ nullable: true })
  worksiteId?: string;

  @ManyToOne(() => Worksite, { nullable: true })
  @JoinColumn({ name: 'worksiteId' })
  worksite?: Worksite;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'datetime', nullable: true })
  publishedAt?: Date;
}



