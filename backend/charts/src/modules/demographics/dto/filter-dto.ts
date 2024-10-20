// src/demographics/dto/filter.dto.ts

import { IsDateString, IsOptional, IsIn } from 'class-validator';

export class FilterDto {
    @IsDateString()
    startDate: string;

    @IsDateString()
    endDate: string;

    @IsOptional()
    @IsIn(['15-25', '>25'])
    ageFilter?: '15-25' | '>25';

    @IsOptional()
    @IsIn(['Male', 'Female'])
    gender?: 'Male' | 'Female';
}
