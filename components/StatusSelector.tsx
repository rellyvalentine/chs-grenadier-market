import { OrderStatus } from "@/utils/types";
import { createListCollection, Portal, Select } from "@chakra-ui/react";


const orderStates = createListCollection({
    items: [
        { label: "Pending", value: "pending" },
        { label: "Fulfilled", value: "fulfilled" },
        { label: "Cancelled", value: "cancelled" },
    ],
})

function isStatusValid(status: string): status is OrderStatus {
    return Object.values(OrderStatus).includes(status as OrderStatus)
}

export default function StatusSelector(props: { status: OrderStatus, onStatusChange: (status: OrderStatus) => void }) {
    const { status, onStatusChange } = props;

    const handleStatusChange = (status: string | undefined) => {
        if(status && isStatusValid(status)) {
            onStatusChange(status)
        }
    }

    return (
        <Select.Root collection={orderStates} size="sm" width="220px" onValueChange={(e) => {handleStatusChange(e.value.at(0))}}>
            <Select.HiddenSelect />
            <Select.Control>
                <Select.Trigger>
                    <Select.ValueText placeholder={`${status.charAt(0).toUpperCase() + status.slice(1)}`} />
                </Select.Trigger>
                <Select.IndicatorGroup>
                    <Select.Indicator />
                </Select.IndicatorGroup>
            </Select.Control>

            <Select.Positioner>
                <Select.Content>
                    {orderStates.items.map((orderState) => (
                        <Select.Item item={orderState} key={orderState.value}>
                            {orderState.label}
                            <Select.ItemIndicator />
                        </Select.Item>
                    ))}
                </Select.Content>
            </Select.Positioner>
        </Select.Root>
    )
}