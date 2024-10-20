import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { cn } from "../../lib/utils";
import { Button } from "./button";
import { Calendar } from "./calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "./popover";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    defaultVal: DateRange;
    onDateChange: (date: DateRange) => void;
}

export function DatePickerWithRange(props: Props) {
    const { defaultVal, onDateChange, className, ...rest } = props;
    const [date, setDate] = React.useState<DateRange | undefined>(defaultVal);

    const handleDateSelect = (selected: DateRange | undefined) => {
        setDate(selected); // Update the state with the new selected date range
        if (selected) onDateChange(selected); // Call the provided onDateChange handler
    };

    return (
        <div className={cn("grid gap-2", className)} {...rest}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant="outline"
                        className={cn(
                            "w-[300px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2" />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, "LLL dd, y")} -{" "}
                                    {format(date.to, "LLL dd, y")}
                                </>
                            ) : (
                                format(date.from, "LLL dd, y")
                            )
                        ) : (
                            <span>Pick a date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={handleDateSelect}
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}
