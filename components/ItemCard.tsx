import { api } from "@/convex/_generated/api";
import { Item } from "@/utils/types";
import { Box, Card, Image, Skeleton } from "@chakra-ui/react";
import { Button } from "@/components/ui/button"
import { Toaster, toaster } from "@/components/ui/toaster"
import { useConvexAuth, useMutation, useQuery } from "convex/react";
import LoginTrigger from "./LoginTrigger";



export default function ItemCard(props: { item: Item }) {

    const { isAuthenticated } = useConvexAuth()

    const addItemToCart = useMutation(api.cart.addItemToCart)
    const handleAddItemToCart = async (type: "pickup" | "donate") => {

        const result = await addItemToCart({
            itemId: props.item._id,
            type: type,
        })
        console.log(result)
        if (result.success) {
            toaster.create({
                title: "Item added to cart",
                description: "You can view the item in your cart",
                type: "success",
            })
        } else {
            toaster.create({
                title: "Failed to add item to cart",
                description: result.message,
                type: "error",
            })
        }
    }

    return (
        <Card.Root transform="scale(0.85)" transformOrigin="top" maxWidth="xs" borderColor="secondary.400" borderBottom="4px solid" borderBottomColor="secondary.400" borderRadius="xl" overflow="hidden" shadow="md">
            <Box w="full" h="250px">
                {(props.item.image !== null) ? (
                    <Image objectFit="cover" src={props.item.image} alt={props.item.name} w="full" h="full" />
                ) : (
                    <Skeleton objectFit="cover" w="full" h="full" />
                )}
            </Box>
            <Card.Body>
                <Card.Title>{props.item.name}</Card.Title>
                <Card.Description>{props.item.description}</Card.Description>
            </Card.Body>
            <Card.Footer>
                {isAuthenticated ? (
                    <>
                        <Button variant="outline" onClick={() => handleAddItemToCart("pickup")}>Pickup Item</Button>
                        <Button variant="outlineSecondary" onClick={() => handleAddItemToCart("donate")}>Donate Item</Button>
                    </>
                ) : (
                    <>
                        <LoginTrigger>
                            <Button>Pickup Item</Button>
                        </LoginTrigger>
                        <LoginTrigger>
                            <Button>Donate Item</Button>
                        </LoginTrigger>
                    </>
                )}
            </Card.Footer>
            <Toaster />
        </Card.Root>
    )
}
