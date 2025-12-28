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
    
    const table = await queryRunner.getTable('sites');
    const existingColumns = table?.columns.map(col => col.name) || [];
    
    console.log('📋 Colonnes existantes:', existingColumns);
    
    // Ajouter les colonnes manquantes
    if (!existingColumns.includes('specificEquipmentText')) {
      await queryRunner.query(`ALTER TABLE sites ADD COLUMN specificEquipmentText TEXT`);
      console.log('✅ Colonne "specificEquipmentText" ajoutée');
    } else {
      console.log('ℹ️  Colonne "specificEquipmentText" existe déjà');
    }
    
    if (!existingColumns.includes('otherEquipmentText')) {
      await queryRunner.query(`ALTER TABLE sites ADD COLUMN otherEquipmentText TEXT`);
      console.log('✅ Colonne "otherEquipmentText" ajoutée');
    } else {
      console.log('ℹ️  Colonne "otherEquipmentText" existe déjà');
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



