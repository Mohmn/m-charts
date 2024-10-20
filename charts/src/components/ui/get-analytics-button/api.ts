// src/api.ts

import { FilterDto } from './types';

export async function getFilteredAnalyticsData(filterState: FilterDto) {
    const params = new URLSearchParams();

    if (filterState.startDate) params.append('startDate', filterState.startDate);
    if (filterState.endDate) params.append('endDate', filterState.endDate);

    if (filterState.ageFilter) params.append('ageFilter', filterState.ageFilter);

    if (filterState.gender) params.append('gender', filterState.gender);
    const apiUrl = `http://localhost:3000/demographics?${params.toString()}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error('Failed to fetch analytics data');
    }

    const data = await response.json();
    return data;
}
