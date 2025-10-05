import { api } from "@/convex/_generated/api";
import { Item, ItemCategories } from "@/utils/types";
import { Button, CloseButton, Dialog, Field, Input, Portal, Select, Text, Textarea, VStack, createListCollection } from "@chakra-ui/react";
import { useMutation } from "convex/react";
import { useState } from "react";
import { useForm } from "react-hook-form"



export default function CreateItemModal() {

    const { register, handleSubmit, reset } = useForm<Item>()
    const [open, setOpen] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const createItem = useMutation(api.items.createItem)

    const itemCategoriesCollection = createListCollection({
        items: Object.values(ItemCategories)
    })

    const onSubmit = async (data: Item) => {
        try {
            setIsLoading(true)
            console.log(data)
            
            // Handle form submission here
            await createItem({
                name: data.name,
                description: data.description,
                category: data.category,
            })

            // Clear the form after successful submission
            reset()
        } catch (error) {
            console.error("Failed to create item:", error)
        } finally {
            setIsLoading(false)
            setOpen(false)
        }
    }

    return (
        <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
            <Dialog.Trigger>
                <Button>Create Item</Button>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>Create Item</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <form id="create-item-form" onSubmit={handleSubmit(onSubmit)}>
                                <VStack>
                                    <Field.Root>
                                        <Field.Label>Item name</Field.Label>
                                        <Input {...register("name")} />
                                        {/* <Field.ErrorText>{errors.firstName?.message}</Field.ErrorText> */}
                                    </Field.Root>

                                    <Field.Root>
                                        <Field.Label>Item category</Field.Label>
                                        <Select.Root collection={itemCategoriesCollection} {...register("category")}>
                                        <Select.HiddenSelect />
                                            <Select.Control>
                                                <Select.Trigger>
                                                    <Select.ValueText placeholder="Select category" />
                                                </Select.Trigger>
                                                <Select.IndicatorGroup>
                                                    <Select.Indicator />
                                                </Select.IndicatorGroup>
                                            </Select.Control>
                                            <Select.Positioner>
                                                <Select.Content>
                                                    {Object.values(ItemCategories).map((category) => (
                                                        <Select.Item item={category} key={category}>
                                                            {category}
                                                            <Select.ItemIndicator />
                                                        </Select.Item>
                                                    ))}
                                                </Select.Content>
                                            </Select.Positioner>
                                        </Select.Root>
                                    </Field.Root>

                                    <Field.Root>
                                        <Field.Label>Item description</Field.Label>
                                        <Textarea {...register("description")} />
                                        {/* <Field.ErrorText>{errors.firstName?.message}</Field.ErrorText> */}
                                    </Field.Root>
                                </VStack>
                            </form>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline">Cancel</Button>
                            </Dialog.ActionTrigger>
                            <Button type="submit" form="create-item-form" loading={isLoading}>Create Item</Button>
                        </Dialog.Footer>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>

            </Portal>
        </Dialog.Root>
    )
}