// src/demographics/demographics.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Demographics } from './demographics.entity';
import { DemographicsService } from './demographics.service';
import { DemographicsController } from './demographics.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Demographics])],
    providers: [DemographicsService],
    controllers: [DemographicsController],
})
export class DemographicsModule { }
