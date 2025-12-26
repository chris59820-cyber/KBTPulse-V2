import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UsersService } from '../modules/users/users.service';
import * as bcrypt from 'bcrypt';
import { UserRole } from '../modules/users/entities/user.entity';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const usersService = app.get(UsersService);

  const adminUsername = 'admin';
  const adminPassword = 'admin123';
  const adminEmail = 'admin@example.com';

  // Vérifier si l'utilisateur admin existe déjà
  const existingAdmin = await usersService.findByUsername(adminUsername);
  
  if (existingAdmin) {
    console.log('✅ L\'utilisateur admin existe déjà');
    await app.close();
    return;
  }

  // Créer l'utilisateur admin
  const hashedPassword = await bcrypt.hash(adminPassword, 10);
  
  try {
    await usersService.create({
      username: adminUsername,
      email: adminEmail,
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'System',
      role: UserRole.ADMIN,
      isActive: true,
    });

    console.log('✅ Utilisateur admin créé avec succès!');
    console.log(`   Username: ${adminUsername}`);
    console.log(`   Password: ${adminPassword}`);
    console.log(`   Email: ${adminEmail}`);
  } catch (error) {
    console.error('❌ Erreur lors de la création de l\'utilisateur admin:', error);
    if (error instanceof Error) {
      console.error('Message:', error.message);
      console.error('Stack:', error.stack);
    }
  }

  await app.close();
}

bootstrap();

