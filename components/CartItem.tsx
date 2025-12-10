import { api } from "@/convex/_generated/api";
import { CartItem } from "@/utils/types";
import { Box, Checkbox, HStack, Image, Text } from "@chakra-ui/react";
import { useQuery } from "convex/react";
import CartItemQuantity from "./CartItemQuantity";


export default function CartItemEntry(props: { cartItem: CartItem, disabled?: boolean, onSelect: (item: CartItem) => void }) {
    const item = useQuery(api.items.getItem, { id: props.cartItem.itemId })
    return (
        <HStack width="full" justify="space-between" alignItems="center" gap={4}>
            <Box flex="0 0 28px">
                <Checkbox.Root disabled={props.disabled} onCheckedChange={(e) => {
                    props.cartItem.selected = !!e.checked
                    props.onSelect(props.cartItem)
                }}>
                    <Checkbox.HiddenInput />
                    <Checkbox.Control>
                        <Checkbox.Indicator />
                    </Checkbox.Control>
                </Checkbox.Root>
            </Box>
            <Box flex="1 1 0">
                <Text fontSize="sm" fontWeight="medium" color={props.disabled ? "gray.500" : "black"}>{item?.name}</Text>
            </Box>
            <Box flex="0 0 100px">
                <Image src="https://picsum.photos/200" alt={item?.name} width={100} height={100} filter={props.disabled ? "grayscale(100%)" : "none"} /> 
            </Box>
            <Box flex="0 0 120px" display="flex" justifyContent="flex-end">
                <CartItemQuantity cartItem={props.cartItem} disabled={props.disabled} />
            </Box>
        </HStack>
    )
}
