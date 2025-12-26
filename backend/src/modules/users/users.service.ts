import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { promises as fs } from 'fs';
import { join } from 'path';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private readonly storagePath: string;

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private configService: ConfigService,
  ) {
    this.storagePath =
      this.configService.get<string>('STORAGE_PATH', './storage') ||
      './storage';
    this.ensureStorageDirectory();
  }

  private async ensureStorageDirectory() {
    const photosDir = join(this.storagePath, 'photos');
    try {
      await fs.mkdir(photosDir, { recursive: true });
    } catch (error) {
      // Le dossier existe déjà
    }
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      relations: ['profile', 'perimeter'],
    });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['profile', 'perimeter'],
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findByUsername(username: string): Promise<User | null> {
    try {
      const user = await this.userRepository.findOne({
        where: { username },
        relations: ['profile', 'perimeter'],
      });
      return user;
    } catch (error) {
      console.error('Error finding user by username with relations:', error);
      // En cas d'erreur avec les relations, essayer sans
      try {
        const user = await this.userRepository.findOne({
          where: { username },
        });
        return user;
      } catch (error2) {
        console.error('Error finding user by username without relations:', error2);
        throw error2;
      }
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email },
      relations: ['profile', 'perimeter'],
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }

  async uploadPhoto(userId: string, file: Express.Multer.File): Promise<{ photo: string }> {
    const user = await this.findOne(userId);
    
    // Supprimer l'ancienne photo si elle existe
    if (user.profile?.photo && !user.profile.photo.startsWith('http')) {
      try {
        const oldPhotoPath = join(this.storagePath, user.profile.photo);
        await fs.unlink(oldPhotoPath).catch(() => {
          // Ignorer si le fichier n'existe pas
        });
      } catch (error) {
        // Ignorer les erreurs de suppression
      }
    }

    // Générer un nom de fichier unique
    const fileName = `photo-${userId}-${Date.now()}-${file.originalname}`;
    const filePath = join(this.storagePath, 'photos', fileName);
    const relativePath = `photos/${fileName}`;

    // Sauvegarder le fichier
    await fs.writeFile(filePath, file.buffer);

    // Mettre à jour le profil utilisateur
    if (!user.profile) {
      // Créer le profil s'il n'existe pas
      const { UserProfile } = await import('./entities/user-profile.entity');
      user.profile = this.userRepository.manager.create(UserProfile, {
        userId: user.id,
        photo: relativePath,
      });
    } else {
      user.profile.photo = relativePath;
    }

    await this.userRepository.save(user);

    return { photo: relativePath };
  }
}
