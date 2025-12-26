import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProfile } from '../users/entities/user-profile.entity';
import { User } from '../users/entities/user.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(UserProfile)
    private profileRepository: Repository<UserProfile>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findByUserId(userId: string): Promise<UserProfile> {
    const profile = await this.profileRepository.findOne({
      where: { userId },
      relations: ['user', 'user.perimeter'],
    });

    if (!profile) {
      // Créer un profil vide si il n'existe pas
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }
      const newProfile = this.profileRepository.create({ userId });
      return this.profileRepository.save(newProfile);
    }

    // Calculer les KM si nécessaire
    if (profile.user?.perimeter && !profile.kmFromHome) {
      // TODO: Récupérer les coordonnées GPS du domicile depuis l'adresse
      // Pour l'instant, on laisse vide
    }

    return profile;
  }

  async update(userId: string, updateProfileDto: UpdateProfileDto): Promise<UserProfile> {
    const profile = await this.findByUserId(userId);
    Object.assign(profile, updateProfileDto);

    // Recalculer les KM si l'adresse ou le périmètre a changé
    if (updateProfileDto.address || profile.user?.perimeter) {
      // TODO: Implémenter le calcul des KM
    }

    return this.profileRepository.save(profile);
  }
}
