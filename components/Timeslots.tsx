import { Timeslot } from "@/utils/types"
import { VStack, RadioCard, Wrap } from "@chakra-ui/react"




export default function Timeslots(props: { date: Date }) {

    // TODO: Get timeslots from backend
    const timeslots: Timeslot[] = [
        {
            date: props.date,
            startTime: "10:00",
            available: true
        },
        {
            date: props.date,
            startTime: "11:00",
            available: false
        }
    ]

    return (
        <RadioCard.Root width="full">
            <Wrap justify="center" gap={4} width="full">
                {timeslots.map((timeslot) => (
                    <RadioCard.Item width="full" disabled={!timeslot.available} key={timeslot.startTime} value={timeslot.startTime}>
                        <RadioCard.ItemHiddenInput />
                        <RadioCard.ItemControl>
                            <RadioCard.ItemText>{timeslot.startTime}</RadioCard.ItemText>
                        </RadioCard.ItemControl>
                    </RadioCard.Item>
            ))}
            </Wrap>
        </RadioCard.Root>
    )
}