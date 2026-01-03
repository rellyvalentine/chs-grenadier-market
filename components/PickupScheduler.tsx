import { Heading, HStack, VStack } from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Timeslots from "./Timeslots";
import * as DateFNS from "date-fns";
import { useState } from "react";

type TExcludeDateIntervals = {
	start: Date;
	end: Date;
}[];

type TIncludeDateIntervals = {
	start: Date;
	end: Date;
}[];

type DateRange = {
	excludeDates: TExcludeDateIntervals;
	includeDates: TIncludeDateIntervals;
};

function getDateRange(): DateRange {
	let today = new Date();

	// Exclude dates before today
	let excludeDates: TExcludeDateIntervals = [
		{
			start: new Date(0),
			end: DateFNS.subDays(today, 1),
		},
	];

	// Exclude all weekends after today
	let includeDates: TIncludeDateIntervals = [];
	let remainingWeeks = DateFNS.differenceInWeeks(DateFNS.endOfYear(today), today);

	// If today is a weekend, add 1 week to the remaining weeks
	if (today.getDay() === 0 || today.getDay() > 5) {
		remainingWeeks = remainingWeeks + 1
	}

	// Include the weekdays for the remaining weeks
	// If today is a weekend, start from next week
	for (let i = (today.getDay() === 0 || today.getDay() > 5) ? 1 : 0; i < remainingWeeks; i++) {
		let weekStart: DateFNS.Day = ((i === 0) ? today.getDay() : 1) as DateFNS.Day // On the current week, get the current day as the week start
		let startOfWeek = DateFNS.startOfWeek(DateFNS.addWeeks(today, i), { weekStartsOn: weekStart }) // Start of the week for the week (i)th week
		let endOfWeek = DateFNS.addDays(startOfWeek, 5 - weekStart) // End of the week for the week (i)th week
		includeDates.push({
			start: startOfWeek,
			end: endOfWeek,
		});
	}

	return {
		excludeDates,
		includeDates,
	};
}

export default function PickupScheduler(props: { onChange: (date: Date, time: number) => void }) {
	const { excludeDates, includeDates } = getDateRange();
	const [selectedDate, setSelectedDate] = useState<Date>(includeDates.length > 0 ? includeDates[0].start : new Date());
	const [selectedTime, setSelectedTime] = useState<number>(0);

	return (
		<VStack width="full" gap={2}>
			<Heading size="lg">Select the pickup date and time</Heading>
			<HStack width="full" justify="space-evenly" align="stretch" gap={20}>
				<VStack alignItems="start">
					<Heading size="md" fontWeight="semibold">
						Choose a date
					</Heading>
					<DatePicker
						selected={selectedDate}
						onChange={(date: Date | null) => {
							if (date) {
								// Set the datetime to the start of the selected day
								date.setHours(0, 0, 0, 0);
								setSelectedDate(date);
								props.onChange(date, selectedTime);
							}
						}}
						excludeDateIntervals={excludeDates}
						includeDateIntervals={includeDates}
						inline
					/>
				</VStack>
				<VStack alignItems="start">
					{(excludeDates.at(0)?.end !== selectedDate) ? (
						<>
							<Heading size="md" fontWeight="semibold">
								Choose a timeslot
							</Heading>
							<Timeslots
								date={selectedDate}
								onTimeSelect={(time: number) => {
									setSelectedTime(time);
									props.onChange(selectedDate, time);
								}}
							/>
						</>
					 ) : (
						<Heading size="md" fontWeight="semibold">No timeslots available for this date</Heading>
					 )}

				</VStack>
			</HStack>
		</VStack>
	);
}

