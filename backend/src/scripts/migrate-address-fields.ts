import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  
  try {
    const dataSource = app.get(DataSource);
    
    // Vérifier si les colonnes existent déjà
    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    
    const table = await queryRunner.getTable('user_profiles');
    const existingColumns = table?.columns.map(col => col.name) || [];
    
    console.log('📋 Colonnes existantes:', existingColumns);
    
    // Ajouter les colonnes manquantes
    if (!existingColumns.includes('street')) {
      await queryRunner.query(`ALTER TABLE user_profiles ADD COLUMN street TEXT`);
      console.log('✅ Colonne "street" ajoutée');
    } else {
      console.log('ℹ️  Colonne "street" existe déjà');
    }
    
    if (!existingColumns.includes('postalCode')) {
      await queryRunner.query(`ALTER TABLE user_profiles ADD COLUMN postalCode TEXT`);
      console.log('✅ Colonne "postalCode" ajoutée');
    } else {
      console.log('ℹ️  Colonne "postalCode" existe déjà');
    }
    
    if (!existingColumns.includes('city')) {
      await queryRunner.query(`ALTER TABLE user_profiles ADD COLUMN city TEXT`);
      console.log('✅ Colonne "city" ajoutée');
    } else {
      console.log('ℹ️  Colonne "city" existe déjà');
    }
    
    if (!existingColumns.includes('country')) {
      await queryRunner.query(`ALTER TABLE user_profiles ADD COLUMN country TEXT`);
      console.log('✅ Colonne "country" ajoutée');
    } else {
      console.log('ℹ️  Colonne "country" existe déjà');
    }
    
    await queryRunner.release();
    
    console.log('\n✅ Migration terminée avec succès !');
  } catch (error) {
    console.error('❌ Erreur lors de la migration:', error);
    if (error instanceof Error) {
      console.error('Message:', error.message);
      console.error('Stack:', error.stack);
    }
  }
  
  await app.close();
}

bootstrap();

