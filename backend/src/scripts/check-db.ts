import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../modules/users/entities/user.entity';
import { Repository } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  
  try {
    const userRepository = app.get<Repository<User>>(getRepositoryToken(User));
    
    // Vérifier si la table existe
    const count = await userRepository.count();
    console.log(`✅ Base de données accessible. Nombre d'utilisateurs: ${count}`);
    
    // Lister tous les utilisateurs
    const users = await userRepository.find({
      select: ['id', 'username', 'email', 'role', 'isActive'],
    });
    
    if (users.length > 0) {
      console.log('\n📋 Utilisateurs existants:');
      users.forEach(user => {
        console.log(`   - ${user.username} (${user.email}) - ${user.role} - ${user.isActive ? 'Actif' : 'Inactif'}`);
      });
    } else {
      console.log('\n⚠️  Aucun utilisateur trouvé dans la base de données');
    }
    
  } catch (error) {
    console.error('❌ Erreur lors de la vérification de la base de données:', error);
    if (error instanceof Error) {
      console.error('Message:', error.message);
      console.error('Stack:', error.stack);
    }
  }
  
  await app.close();
}

bootstrap();

