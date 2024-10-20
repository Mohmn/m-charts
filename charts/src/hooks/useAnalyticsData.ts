import { useQuery } from "react-query";
import { FilterState } from "../context/filter";
import { getFilteredAnalyticsData } from "../components/ui/get-analytics-button/api";
import { FilterDto } from "../components/ui/get-analytics-button/types";


export default function useAnalyticsData(filterState: FilterState) {
    const queryKey = [
        'analyticsData',
        filterState.dateRange[0] || '',
        filterState.dateRange[1] || '',
        filterState.ageRange || '',
        filterState.gender || '',
    ];
    const gotSomethingToFilter = Boolean(filterState.dateRange[0] && filterState.dateRange[1]) || Boolean(filterState.ageRange) || Boolean(filterState.gender);
    return useQuery(
        queryKey,
        () => getFilteredAnalyticsData(convertFilterStateToDto(filterState)),
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
