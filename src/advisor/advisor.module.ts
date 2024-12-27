import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Advisor } from './advisor.entity';
import { Company } from './advisor.entity';
import { Investor } from './advisor.entity';
import { AdvisorService } from './advisor.service';
import { AdvisorController } from './advisor.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Advisor, Company, Investor])],
  providers: [AdvisorService],
  controllers: [AdvisorController],
})
export class AdvisorModule {}
