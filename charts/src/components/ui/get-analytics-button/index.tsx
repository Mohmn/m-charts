// GetAnalyticsButton.tsx
import { useDateAgeGender } from '../../../context/filter';
import { Button } from '../button';
import useAnalyticsData from '../../../hooks/useAnalyticsData';

export default function GetAnalyticsButton() {
    const filterState = useDateAgeGender();


    const { isLoading, isError, } = useAnalyticsData(filterState)

    return (
        <div className="flex justify-center">
            <Button >
                {isLoading ? 'Loading...' : 'Get Analytics'}
            </Button>
            {isError && <div>Error loading data</div>}

        </div>
    );
}
