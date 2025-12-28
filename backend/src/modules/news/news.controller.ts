import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFiles,
  Res,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { CreateSecurityAlertDto } from './dto/create-security-alert.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';
import { NewsCategory } from './entities/news.entity';

@Controller('news')
@UseGuards(JwtAuthGuard)
export class NewsController {
  private readonly storagePath: string;

  constructor(
    private readonly newsService: NewsService,
    private readonly configService: ConfigService,
  ) {
    this.storagePath =
      this.configService.get<string>('STORAGE_PATH', './storage') ||
      './storage';
  }

  @Get()
  findAll(
    @Query('perimeterId') perimeterId?: string,
    @Query('worksiteId') worksiteId?: string,
    @Query('category') category?: NewsCategory,
  ) {
    return this.newsService.findAllNews({
      perimeterId,
      worksiteId,
      category,
    });
  }

  @Get('files/*')
  async getFile(@Param('0') filePath: string, @Res() res: Response) {
    const fullPath = join(process.cwd(), this.storagePath, filePath);
    res.sendFile(fullPath);
  }

  @Get('security-alerts')
  findSecurityAlerts(
    @Request() req,
    @Query('perimeterId') perimeterId?: string,
  ) {
    // Utiliser le périmètre de l'utilisateur si non spécifié
    const targetPerimeterId = perimeterId || req.user.perimeterId;
    return this.newsService.findAllSecurityAlerts(targetPerimeterId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newsService.findOne(id);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.CAFF, UserRole.RDC)
  @UseInterceptors(FilesInterceptor('files', 20))
  create(
    @Body() createNewsDto: CreateNewsDto,
    @UploadedFiles() files?: any[],
  ) {
    return this.newsService.createNews(createNewsDto, files);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.CAFF, UserRole.RDC)
  @UseInterceptors(FilesInterceptor('files', 20))
  update(
    @Param('id') id: string,
    @Body() updateNewsDto: UpdateNewsDto,
    @UploadedFiles() files?: any[],
  ) {
    return this.newsService.updateNews(id, updateNewsDto, files);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.CAFF, UserRole.RDC)
  remove(@Param('id') id: string) {
    return this.newsService.removeNews(id);
  }

  @Post('security-alerts')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.CAFF, UserRole.RDC)
  createSecurityAlert(@Body() createAlertDto: CreateSecurityAlertDto) {
    return this.newsService.createSecurityAlert(createAlertDto);
  }
}



