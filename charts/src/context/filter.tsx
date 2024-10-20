/* eslint-disable @typescript-eslint/no-explicit-any */
import { addDays, format } from 'date-fns';
import React, {
    useReducer,
    createContext,
    ReactNode,
    useContext,
    useCallback,
    useEffect,
} from 'react';

// Helper functions to manage cookies
function setCookie(name: string, value: string, days: number) {
    const expires = format(addDays(new Date(), days), 'EEE, dd MMM yyyy HH:mm:ss \'GMT\'');
    console.log('exppires', expires);
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

function getCookie(name: string): string | null {
    const cookieArr = document.cookie.split('; ');
    for (let cookie of cookieArr) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName === name) return decodeURIComponent(cookieValue);
    }
    return null;
}

export type FilterState = {
    dateRange: [string, string]; // Start and End Date
    ageRange: string;
    gender: string;
};

type ActionType =
    | { type: 'SET_DATE_RANGE'; payload: [string, string] }
    | { type: 'SET_AGE_RANGE'; payload: string }
    | { type: 'SET_GENDER'; payload: string };

const initialState: FilterState = JSON.parse(
    getCookie('dateAgeGenderState') ||
    JSON.stringify({
        dateRange: ['2022-10-01', '2022-10-04'], // Default date range
        ageRange: '',
        gender: '',
    })
);

function filterReducer(state: FilterState, action: ActionType): FilterState {
    switch (action.type) {
        case 'SET_DATE_RANGE':
            return { ...state, dateRange: action.payload };
        case 'SET_AGE_RANGE':
            return { ...state, ageRange: action.payload };
        case 'SET_GENDER':
            return { ...state, gender: action.payload };
        default:
            throw new Error(`Unhandled action type: ${action}`);
    }
}

const FilterContext = createContext<FilterState | undefined>(undefined);
const FilterDispatchContext = createContext<React.Dispatch<ActionType> | undefined>(undefined);

function debounce(func: (...args: any[]) => void, delay: number) {
    let timer: NodeJS.Timeout;
    return (...args: any[]) => {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), delay);
    };
}

export function DateAgeGenderProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(filterReducer, initialState);

    const saveStateToCookies = useCallback(
        debounce((state: FilterState) => {
            setCookie('dateAgeGenderState', JSON.stringify(state), 30);
        }, 500),
        []
    );

    useEffect(() => {
        saveStateToCookies(state);
    }, [state, saveStateToCookies]);

    return (
        <FilterContext.Provider value={state}>
            <FilterDispatchContext.Provider value={dispatch}>
                {children}
            </FilterDispatchContext.Provider>
        </FilterContext.Provider>
    );
}

export function useDateAgeGender() {
    const context = useContext(FilterContext);
    if (context === undefined) {
        throw new Error('useDateAgeGender must be used within a DateAgeGenderProvider');
    }
    return context;
}

export function useDateAgeGenderDispatch() {
    const context = useContext(FilterDispatchContext);
    if (context === undefined) {
        throw new Error('useDateAgeGenderDispatch must be used within a DateAgeGenderProvider');
    }
    return context;
}

FilterContext.displayName = 'DateAgeGenderContext';
