import { api } from "@/convex/_generated/api";
import { Item } from "@/utils/types";
import { Button, Card, Image } from "@chakra-ui/react";
import { Toaster, toaster } from "@/components/ui/toaster"
import { useMutation } from "convex/react";



export default function ItemCard(props: { item: Item }) {
    const addItemToCart = useMutation(api.cart.addItemToCart)
    const handleAddItemToCart = async (type: "pickup" | "donate") => {
        const cartItemId = await addItemToCart({
            itemId: props.item._id,
            type: type,
        })
        console.log(cartItemId)
        if(cartItemId) {
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
        <Card.Root>
            <Image />
            <Card.Body>
                <Card.Title>{props.item.name}</Card.Title>
                <Card.Description>{props.item.description}</Card.Description>
            </Card.Body>
            <Card.Footer>
                <Button onClick={() => handleAddItemToCart("pickup")}>Pickup Item</Button>
                <Button onClick={() => handleAddItemToCart("donate")}>Donate Item</Button>
            </Card.Footer>
            <Toaster />
        </Card.Root>
    )
}