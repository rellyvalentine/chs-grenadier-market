import { ItemCategories } from "@/utils/types";
import { VStack, Heading, Box, Checkbox } from "@chakra-ui/react";



export default function FilterSelector() {
    return (
        <VStack alignItems="start">
            <Heading size="lg">Filter items</Heading>
            <Box>
                <VStack gap={2} alignItems="start">
                    {Object.keys(ItemCategories).map((c) => (
                    <Checkbox.Root key={c}>
                        <Checkbox.HiddenInput />
                        <Checkbox.Control borderRadius={4} _checked={{ bg: "primary.600", borderColor: "primary.600" }}>
                            <Checkbox.Indicator />
                        </Checkbox.Control>
                        <Checkbox.Label>{c}</Checkbox.Label>
                    </Checkbox.Root>
                    ))}
                </VStack>
            </Box>
        </VStack>
    )
}