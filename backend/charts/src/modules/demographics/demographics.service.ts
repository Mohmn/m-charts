// src/demographics/demographics.service.ts

import { Injectable } from '@nestjs/common';
import { Demographics } from './demographics.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterDto } from './dto/filter-dto';

@Injectable()
export class DemographicsService {
    constructor(
        @InjectRepository(Demographics)
        private readonly demographicsRepository: Repository<Demographics>,
    ) { }

    // demographics.service.ts

    // demographics.service.ts

    async getFilteredData(filterDto: FilterDto): Promise<any> {
        const { startDate, endDate, ageFilter, gender } = filterDto;

        console.log('filter', filterDto);

        const query = this.demographicsRepository.createQueryBuilder('demographics');

        query.where('demographics.day BETWEEN :startDate AND :endDate', { startDate, endDate });

        if (gender) {
            query.andWhere('demographics.gender = :gender', { gender });
        }

        if (ageFilter) {
            if (ageFilter === '15-25') {
                query.andWhere('demographics.min_age = :minAge AND demographics.max_age = :maxAge', {
                    minAge: 15,
                    maxAge: 25,
                });
            } else if (ageFilter === '>25') {
                query.andWhere('demographics.min_age >= :minAge AND demographics.max_age IS NULL', {
                    minAge: 26,
                });
            }
        }

        query
            .select('SUM(demographics.a)', 'A')
            .addSelect('SUM(demographics.b)', 'B')
            .addSelect('SUM(demographics.c)', 'C')
            .addSelect('SUM(demographics.d)', 'D')
            .addSelect('SUM(demographics.e)', 'E')
            .addSelect('SUM(demographics.f)', 'F');


        const data = await query.getRawOne(); // Use getRawMany() if grouping
        return data;
    }



    async getFilteredDataPerLabel(label: string, filterDto: FilterDto): Promise<any> {
        const { startDate, endDate, ageFilter, gender } = filterDto;


        const query = this.demographicsRepository.createQueryBuilder('demographics');

        query.where('demographics.day BETWEEN :startDate AND :endDate', { startDate, endDate });

        if (gender) {
            query.andWhere('demographics.gender = :gender', { gender });
        }

        if (ageFilter) {
            if (ageFilter === '15-25') {
                query.andWhere('demographics.min_age = :minAge AND demographics.max_age = :maxAge', {
                    minAge: 15,
                    maxAge: 25,
                });
            } else if (ageFilter === '>25') {
                query.andWhere('demographics.min_age >= :minAge AND demographics.max_age IS NULL', {
                    minAge: 26,
                });
            }
        }

        query
            .select(`demographics.${label.toLowerCase()}`, label.toUpperCase())
            .addSelect('demographics.day', 'day')
        query.addGroupBy('demographics.day')
        query.addGroupBy(`demographics.${label.toLowerCase()}`);

        const data = await query.getRawMany();
        return data;
    }


}
