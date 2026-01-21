import { createListCollection, Portal, Select } from "@chakra-ui/react";


const orderStates = createListCollection({
    items: [
        { label: "Pending", value: "pending" },
        { label: "Fulfilled", value: "fulfilled" },
        { label: "Cancelled", value: "cancelled" },
    ],
})

export default function StatusSelector(props: { status: string }) {
    const { status } = props;
    return (
        <Select.Root collection={orderStates} size="sm" width="220px">
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