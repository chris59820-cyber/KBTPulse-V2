import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from './entities/user.entity';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.CAFF)
  create(@Body() body: CreateUserDto & { profile?: any }) {
    return this.usersService.create(body);
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles(
    UserRole.ADMIN,
    UserRole.CAFF,
    UserRole.RDC,
    UserRole.PREPA,
    UserRole.CE,
    UserRole.RH,
  )
  findAll() {
    return this.usersService.findAll();
  }

  @Get('me')
  getProfile(@Request() req) {
    return this.usersService.findOne(req.user.userId);
  }

  @Get(':id')
  @UseGuards(RolesGuard)
  @Roles(
    UserRole.ADMIN,
    UserRole.CAFF,
    UserRole.RDC,
    UserRole.PREPA,
    UserRole.CE,
    UserRole.RH,
  )
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.CAFF, UserRole.RH)
  update(@Param('id') id: string, @Body() body: UpdateUserDto & { profile?: any }) {
    return this.usersService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.CAFF)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Post(':id/photo')
  @UseInterceptors(FileInterceptor('photo'))
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.CAFF, UserRole.RH)
  async uploadPhoto(
    @Param('id') id: string,
    @UploadedFile() file: any,
  ) {
    if (!file) {
      throw new BadRequestException('Photo file is required');
    }
    
    // Vérifier le type de fichier
    const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException('Invalid file type. Only images are allowed.');
    }

    // Vérifier la taille (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      throw new BadRequestException('File size exceeds 5MB limit.');
    }

    return this.usersService.uploadPhoto(id, file);
  }

  @Patch('me/favorite-perimeter')
  async setFavoritePerimeter(
    @Request() req,
    @Body() body: { perimeterId: string | null },
  ) {
    return this.usersService.setFavoritePerimeter(req.user.userId, body.perimeterId);
  }

  @Get('me/favorite-perimeter')
  async getFavoritePerimeter(@Request() req) {
    const perimeterId = await this.usersService.getFavoritePerimeter(req.user.userId);
    return { perimeterId };
  }
}
