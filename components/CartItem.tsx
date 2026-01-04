import { api } from "@/convex/_generated/api";
import { CartItem } from "@/utils/types";
import { Box, Checkbox, Grid, GridItem, HStack, Image, Text } from "@chakra-ui/react";
import { useQuery } from "convex/react";
import CartItemQuantity from "./CartItemQuantity";


export default function CartItemEntry(props: { cartItem: CartItem, disabled?: boolean, onSelect: (item: CartItem) => void }) {
    const item = useQuery(api.items.getItem, { id: props.cartItem.itemId })
    return (
        <Grid templateColumns="1fr auto 1fr" gap={4}>
            <GridItem>
                <HStack>
                    <Box flex="0 0 28px">
                        <Checkbox.Root disabled={props.disabled} onCheckedChange={(e) => {
                            props.cartItem.selected = !!e.checked
                            props.onSelect(props.cartItem)
                        }}>
                            <Checkbox.HiddenInput />
                            <Checkbox.Control borderRadius={4} _checked={{ bg: "primary.600", borderColor: "primary.600" }}>
                                <Checkbox.Indicator />
                            </Checkbox.Control>
                        </Checkbox.Root>
                    </Box>
                    <Box>
                        <Text fontSize="md" fontWeight="medium" color={props.disabled ? "gray.500" : "black"}>{item?.name}</Text>
                    </Box>
                </HStack>
            </GridItem>

            <GridItem>
                <Box flex="0 0 100px">
                    <Image src="https://picsum.photos/200" alt={item?.name} width={100} height={100} filter={props.disabled ? "grayscale(100%)" : "none"} />
                </Box>
            </GridItem>

            <GridItem>
                <Box>
                    <CartItemQuantity cartItem={props.cartItem} disabled={props.disabled} />
                </Box>
            </GridItem>
        </Grid>
    )
}
