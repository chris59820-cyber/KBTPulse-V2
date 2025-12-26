import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    });
  }

  async validate(username: string, password: string): Promise<any> {
    try {
      console.log('LocalStrategy: Validating user:', username);
      const user = await this.authService.validateUser(username, password);
      if (!user) {
        console.log('LocalStrategy: User not found or invalid');
        throw new UnauthorizedException();
      }
      console.log('LocalStrategy: User validated successfully:', user.id);
      return user;
    } catch (error) {
      console.error('LocalStrategy: Error during validation:', error);
      throw error;
    }
  }
}
