import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdvisorModule } from './advisor/advisor.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // Change to your database type (e.g., 'postgres', 'sqlite')
      host: 'localhost', // Database host
      port: 5432, // Database port
      username: 'postgres', // Dposatabase username
      password: '4682', // Database password
      database: 'optra_02', // Database name
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Automatically load all entities
      synchronize: true, // Auto-sync schema (set to false in production)
    }),
    AdvisorModule, // Register the AdvisorModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
