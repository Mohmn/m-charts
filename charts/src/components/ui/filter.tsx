import { useDateAgeGenderDispatch } from "../../context/filter";
import { DatePickerWithRange } from "./data-range-picker";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./select"
import { format } from 'date-fns';



export function Filters() {

    const dateDispatch = useDateAgeGenderDispatch()

    return (
        <>
            <div className="flex gap-5 m-10 justify-center md:flex-row flex-col">
                <DatePickerWithRange
                    defaultVal={{
                        from: new Date('2022-10-04'),
                        to: new Date('2022-10-29')
                    }}
                    onDateChange={(d) => {
                        if (d.from && d.to) {
                            const fromDate = format(d.from, 'yyyy-MM-dd');
                            const toDate = format(d.to, 'yyyy-MM-dd');
                            dateDispatch({ type: 'SET_DATE_RANGE', payload: [fromDate, toDate] })
                        }
                    }}
                />
                <Select
                    onValueChange={(v) => {
                        dateDispatch({ type: 'SET_AGE_RANGE', payload: v })
                    }}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Age" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="15-25">15-25</SelectItem>
                        <SelectItem value=">25">{'>25'}</SelectItem>
                    </SelectContent>
                </Select>
                <Select
                    onValueChange={(v) => {
                        dateDispatch({ type: 'SET_GENDER', payload: v })
                    }}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Gender" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                    </SelectContent>
                </Select>
            </div>

        </>
    )
}