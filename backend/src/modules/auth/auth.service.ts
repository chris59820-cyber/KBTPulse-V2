import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    try {
      const user = await this.usersService.findByUsername(username);
      if (!user) {
        throw new UnauthorizedException('Identifiant ou mot de passe incorrect');
      }

      if (!user.password) {
        throw new UnauthorizedException('Mot de passe non défini');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Identifiant ou mot de passe incorrect');
      }

      if (!user.isActive) {
        throw new UnauthorizedException('Compte désactivé');
      }

      const { password: _, ...result } = user;
      return result;
    } catch (error) {
      console.error('Error validating user:', error);
      if (error instanceof Error) {
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      // Propager l'erreur originale pour voir le vrai problème
      throw error;
    }
  }

  async login(user: User) {
    const payload = {
      username: user.username,
      sub: user.id,
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        perimeterId: user.perimeterId,
        favoritePerimeterId: user.favoritePerimeterId,
      },
    };
  }

  async register(
    username: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    role?: string,
  ) {
    const existingUser = await this.usersService.findByUsername(username);
    if (existingUser) {
      throw new BadRequestException('Cet identifiant est déjà utilisé');
    }

    const existingEmail = await this.usersService.findByEmail(email);
    if (existingEmail) {
      throw new BadRequestException('Cet email est déjà utilisé');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    return this.usersService.create({
      username,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role: role as any,
    });
  }
}
