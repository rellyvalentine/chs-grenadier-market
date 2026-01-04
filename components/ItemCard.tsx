import { api } from "@/convex/_generated/api";
import { Item } from "@/utils/types";
import { Card, Image } from "@chakra-ui/react"; 
import { Button } from "@/components/ui/button"
import { Toaster, toaster } from "@/components/ui/toaster"
import { useConvexAuth, useMutation, useQuery } from "convex/react";
import LoginTrigger from "./LoginTrigger";



export default function ItemCard(props: { item: Item }) {
    
    const { isAuthenticated } = useConvexAuth()

    const addItemToCart = useMutation(api.cart.addItemToCart)
    const handleAddItemToCart = async (type: "pickup" | "donate") => {
        const cartItemId = await addItemToCart({
            itemId: props.item._id,
            type: type,
        })
        console.log(cartItemId)
        if (cartItemId) {
            toaster.create({
                title: "Item added to cart",
                description: "You can now checkout your cart",
                type: "success",
            })
        } else {
            toaster.create({
                title: "Failed to add item to cart",
                description: "Please try again",
                type: "error",
            })
        }
    }
    return (
        <Card.Root maxWidth="xs" borderColor="secondary.400" borderBottom="4px solid" borderBottomColor="secondary.400" borderRadius="xl" overflow="hidden" shadow="md">
            <Image src="https://picsum.photos/100/75" alt={props.item.name} />
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
