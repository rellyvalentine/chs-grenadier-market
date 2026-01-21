import { Button, Icon } from "@chakra-ui/react";
import { forwardRef, useState } from "react";
import DatePicker from "react-datepicker";
import "@/styles/date-picker.css";
import { HiOutlineCalendar } from "react-icons/hi";


type DatePickerTriggerProps = {
    value?: string;
    onClick?: () => void;
}

const DatePickerTrigger = forwardRef<
    HTMLButtonElement,
    DatePickerTriggerProps
>(({ value, onClick }, ref) => (
    <Button size="xs" variant="outline" borderColor="secondary.400" borderRadius="md" _focus={{ borderColor: "secondary.400" }} onClick={onClick} ref={ref}>
        <Icon as={HiOutlineCalendar} />
        {value}
    </Button>
));

export default function DateRangeSelector(props: { startDate: Date | null, endDate: Date | null, onChange: (dates: [Date | null, Date | null]) => void }) {
    const { startDate, endDate, onChange } = props;

    return (
        <DatePicker 
        customInput={<DatePickerTrigger value={`${startDate?.toLocaleDateString()} - ${endDate?.toLocaleDateString()}`} />} 
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange />
    )
}