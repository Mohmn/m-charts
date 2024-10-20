import { useQuery } from "react-query";
import { FilterState } from "../context/filter";
import { FilterDto } from "../components/ui/get-analytics-button/types";

type ChartDataLabel = { 'day': string, [key: string]: number | string }[];
export async function getFilteredLabelData(filterState: FilterDto & { label: string }) {
    const params = new URLSearchParams();

    if (filterState.startDate) params.append('startDate', filterState.startDate);
    if (filterState.endDate) params.append('endDate', filterState.endDate);
    if (filterState.ageFilter) params.append('ageFilter', filterState.ageFilter);

    if (filterState.gender) params.append('gender', filterState.gender);

    const apiUrl = `http://localhost:3000/demographics/${filterState.label}?${params.toString()}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error('Failed to fetch analytics data');
    }

    const data = await response.json() as ChartDataLabel[];
    return data;
}


export default function useLabelAnalyticsData(label: string, filterState: FilterState) {
    const queryKey = [
        'analyticsLabelData',
        label,
        filterState.dateRange[0] || '',
        filterState.dateRange[1] || '',
        filterState.ageRange || '',
        filterState.gender || '',
    ];
    const gotSomethingToFilter = Boolean(filterState.dateRange[0] && filterState.dateRange[1]) || Boolean(filterState.ageRange) || Boolean(filterState.gender);
    return useQuery(
        queryKey,
        () => getFilteredLabelData({ ...convertFilterStateToDto(filterState), label }),
        {
            enabled: gotSomethingToFilter,
            retry: 1,
            onError: (error) => {
                console.error('Error fetching analytics data:', error);
            },
            cacheTime: 1000 * 60 * 5, // 5 min
            staleTime: 1000 * 60 * 5, // 5 min
        }
    );
}

function convertFilterStateToDto(filterState: FilterState): FilterDto {
    const [startDate, endDate] = filterState.dateRange;

    const dto: FilterDto = {};

    if (startDate) dto.startDate = startDate;
    if (endDate) dto.endDate = endDate;
    if (filterState.ageRange) dto.ageFilter = filterState.ageRange;
    if (filterState.gender) dto.gender = filterState.gender;

    return dto;
}
