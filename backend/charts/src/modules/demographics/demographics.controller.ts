// src/demographics/demographics.controller.ts

import { Controller, Get, Param, Query } from '@nestjs/common';
import { FilterDto } from './dto/filter-dto'
import { DemographicsService } from './demographics.service';

@Controller('demographics')
export class DemographicsController {
    constructor(private readonly demographicsService: DemographicsService) { }

    @Get()
    async getDemographics(@Query() filterDto: FilterDto) {
        return await this.demographicsService.getFilteredData(filterDto);
    }

    @Get('/:label')
    async getDemographicsPerBale(@Param('label') label: string, @Query() filterDto: FilterDto) {
        return await this.demographicsService.getFilteredDataPerLabel(label, filterDto);
    }
}
