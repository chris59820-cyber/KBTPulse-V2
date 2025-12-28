import { Entity, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { UserProfile } from './user-profile.entity';
import { Perimeter } from '../../perimeters/entities/perimeter.entity';

export enum UserRole {
  ADMIN = 'ADMIN',
  CAFF = 'CAFF',
  RDC = 'RDC',
  PREPA = 'PRÉPA',
  CE = 'CE',
  RH = 'RH',
  OTHER = 'AUTRE',
  EMPLOYEE = 'EMPLOYEE',
}

@Entity('users')
export class User extends BaseEntity {
  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string; // Hashé avec bcrypt

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    type: 'text',
    default: UserRole.EMPLOYEE,
  })
  role: UserRole;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  perimeterId?: string;

  @ManyToOne(() => Perimeter, { nullable: true })
  @JoinColumn({ name: 'perimeterId' })
  perimeter?: Perimeter;

  @Column({ nullable: true })
  favoritePerimeterId?: string;

  @ManyToOne(() => Perimeter, { nullable: true })
  @JoinColumn({ name: 'favoritePerimeterId' })
  favoritePerimeter?: Perimeter;

  @OneToOne(() => UserProfile, (profile) => profile.user, {
    cascade: true,
    nullable: true,
  })
  @JoinColumn()
  profile?: UserProfile;

  @Column({ nullable: true })
  twoFactorSecret?: string;

  @Column({ default: false })
  twoFactorEnabled: boolean;
}
