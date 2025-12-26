import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { CreateSecurityAlertDto } from './dto/create-security-alert.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';
import { NewsCategory } from './entities/news.entity';

@Controller('news')
@UseGuards(JwtAuthGuard)
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

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

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.CAFF, UserRole.RDC)
  create(@Body() createNewsDto: CreateNewsDto) {
    return this.newsService.createNews(createNewsDto);
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

  @Post('security-alerts')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.CAFF, UserRole.RDC)
  createSecurityAlert(@Body() createAlertDto: CreateSecurityAlertDto) {
    return this.newsService.createSecurityAlert(createAlertDto);
  }
}

