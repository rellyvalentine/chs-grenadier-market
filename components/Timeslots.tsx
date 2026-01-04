import { api } from "@/convex/_generated/api"
import { Timeslot } from "@/utils/types"
import { VStack, RadioCard, Wrap, WrapItem, Skeleton } from "@chakra-ui/react"
import { useQuery } from "convex/react"


function formatTime(time: number): string {
    return new Date(time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'America/New_York' })
}


export default function Timeslots(props: { date: Date, onTimeSelect: (time: number) => void }) {

    const timeslots = useQuery(api.orders.getAvailableTimeslots, { date: props.date.getTime() })


    return (
        <RadioCard.Root maxW="400px">
            <Wrap gap={4} justify="center">
                {timeslots ? (timeslots.map((timeslot) => (
                    <WrapItem key={timeslot.startTime}>
                        <RadioCard.Item onChange={() => props.onTimeSelect(timeslot.startTime)} cursor={timeslot.available ? "pointer" : "not-allowed"} disabled={!timeslot.available} key={timeslot.startTime} value={timeslot.startTime.toString()} _checked={{ borderColor: "primary.600", bg: "primary.100/50", shadowColor: "primary.700" }}>
                            <RadioCard.ItemHiddenInput />
                            <RadioCard.ItemControl>
                                <RadioCard.ItemText fontSize="sm">{formatTime(timeslot.startTime)}</RadioCard.ItemText>
                            </RadioCard.ItemControl>
                        </RadioCard.Item>
                    </WrapItem>
                ))) : (
                    <>
                        {Array.from({ length: 18 }).map((_, index) => (
                            <WrapItem key={index} width="100px">
                                <Skeleton height="52px" width="full" />
                            </WrapItem>
                        ))}
                    </>
                )}
            </Wrap>
        </RadioCard.Root>
    )
}