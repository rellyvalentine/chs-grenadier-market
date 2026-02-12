import { Item, ItemCategories } from "@/utils/types";
import { Box, Button, CloseButton, Dialog, Icon, Portal, IconButton, createListCollection, Select, Input, Field, VStack, Textarea, HStack, Image, Text, FileUpload } from "@chakra-ui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Toaster, toaster } from "@/components/ui/toaster"
import { useForm } from "react-hook-form";
import { FaPenToSquare } from "react-icons/fa6";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { fromByteArray } from "base64-js";
import { LuFileImage } from "react-icons/lu";




export default function ItemModal(props: { item: Item | null, variant: "edit" | "create" }) {
    const { item, variant } = props;
    const [open, setOpen] = useState<boolean>(false)
    const [itemImage, setItemImage] = useState<File | null>(null)
    const [previewImage, setPreviewImage] = useState<string | null>()

    const { register, handleSubmit, reset } = useForm<Item>(item ? { defaultValues: item } : undefined)

    const itemCategoriesCollection = createListCollection({
        items: Object.values(ItemCategories)
    })

    useEffect(() => {
        if (item) {
            setPreviewImage(item.image)
            console.log(previewImage)
        }
    }, [item])

    const handleItemImageChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const buffer = await file.arrayBuffer()
            const imgString = fromByteArray(new Uint8Array(buffer))
            setPreviewImage(`data:${file.type};base64,${imgString}`)
            setItemImage(file)
        }
    }, [])

    const generateUploadUrl = useMutation(api.items.generateUploadUrl)
    const createItem = useMutation(api.items.createItem)

    const onSubmit = async (data: Item,) => {

        if (variant === "create") {
            if (itemImage && itemImage instanceof File) {
                const uploadUrl = await generateUploadUrl()
                const result = await fetch(uploadUrl, {
                    method: "POST",
                    headers: { "Content-Type": itemImage.type },
                    body: itemImage,
                })
                const { storageId } = await result.json()
                const itemId = await createItem({
                    name: data.name,
                    description: data.description,
                    category: data.category,
                    quantity: Number(data.quantity),
                    image: storageId,
                })

                if (itemId) {
                    toaster.create({
                        title: "Item created successfully",
                        description: "The item has been created successfully",
                        type: "success",
                    })
                }
                else {
                    toaster.create({
                        title: "Failed to create item",
                        description: "The item was not created successfully",
                        type: "error",
                    })
                }

            } else {
                console.error("No item image provided")
            }
        }
        else if (variant === "edit") {
            if (itemImage && itemImage instanceof File) {
                const uploadUrl = await generateUploadUrl()
                const result = await fetch(uploadUrl, {
                    method: "POST",
                    headers: { "Content-Type": itemImage.type },
                    body: itemImage,
                })
            }
        }
    }

    return (
        <Dialog.Root open={open} onOpenChange={(e) => { setOpen(e.open); reset(); e.open ? setPreviewImage(item ? item.image : null) : setPreviewImage(null) }} size="lg">
            <Dialog.Trigger>
                {variant === "edit" ? (
                    <Box minH="45px" w="full" display="flex" alignItems="center">
                        <IconButton size="sm" padding={2} variant="outline" aria-label="Edit Item"><Icon as={FaPenToSquare} /></IconButton>
                    </Box>
                ) : (
                    <Box minH="45px" w="full" display="flex" alignItems="end">
                        <Button w="full">Create Item</Button>
                    </Box>
                )}
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content padding={4}>
                        <Dialog.Header>
                            <Dialog.Title fontSize="3xl" fontWeight="semibold">{variant === "edit" ? "Edit Item" : "Create Item"}</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <form id="create-item-form" onSubmit={handleSubmit(onSubmit)}>
                                <VStack w="full" gap={4}>
                                    <HStack w="full" justifyContent="space-between">
                                        <Field.Root>
                                            <Field.Label fontSize="md" fontWeight="medium">Item name</Field.Label>
                                            <Input {...register("name")} placeholder="Enter item name" />
                                        </Field.Root>

                                        <Field.Root>
                                            <Field.Label fontSize="md" fontWeight="medium">Item category</Field.Label>
                                            <Select.Root collection={itemCategoriesCollection} {...register("category")} value={item ? [item.category] : undefined}>
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
                                    </HStack>

                                    <HStack w="full" justifyContent="space-between">
                                        <Field.Root>
                                            <Field.Label fontSize="md" fontWeight="medium">Item description</Field.Label>
                                            <Textarea {...register("description")} placeholder="Enter item description" resize="none" />
                                        </Field.Root>
                                        <Field.Root>
                                            <Field.Label fontSize="md" fontWeight="medium">Item quantity</Field.Label>
                                            <Input type="number" {...register("quantity")} placeholder="Enter item quantity" />
                                        </Field.Root>
                                    </HStack>

                                    <HStack w="full">
                                        <Box>
                                            <Field.Root>
                                                <Field.Label fontSize="md" fontWeight="medium">Item image</Field.Label>
                                                {/* <Input type="file" accept="image/*" onChange={handleItemImageChange} /> */}
                                                <FileUpload.Root accept="image/*" onChange={handleItemImageChange} >
                                                    <FileUpload.HiddenInput />
                                                    <FileUpload.Trigger asChild>
                                                        <Box minH="45px" w="full" display="flex" alignItems="center">
                                                            <Button variant="outline" size="sm">
                                                                <Icon as={LuFileImage} /> Upload image</Button>
                                                        </Box>
                                                    </FileUpload.Trigger>
                                                </FileUpload.Root>
                                            </Field.Root>
                                        </Box>
                                        <Box display="flex" alignItems="center" justifyContent="center" w="200px" h="200px" border="1px solid" borderColor="gray.200" borderRadius="md">
                                            {previewImage ? <Image src={previewImage} alt="Item image" width={200} height={200} /> : <Text fontSize="sm" color="gray.500">No image selected</Text>}
                                        </Box>
                                    </HStack>
                                </VStack>
                            </form>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline">Cancel</Button>
                            </Dialog.ActionTrigger>
                            <Button type="submit" form="create-item-form">{variant === "edit" ? "Update Item" : "Create Item"}</Button>
                        </Dialog.Footer>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
            <Toaster />
        </Dialog.Root>
    )
}