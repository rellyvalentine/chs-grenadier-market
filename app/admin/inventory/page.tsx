"use client"

import { Box, Button, Dialog, Grid, GridItem, HStack, Portal, Separator, Skeleton, Text, VStack } from "@chakra-ui/react"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api";
import Sidebar from "@/components/Sidebar";
import InventorySection from "@/components/InventorySection";

export default function InventoryPage() {


    const user = useQuery(api.users.getCurrentUser);
    console.log(user);

    return (
        <Skeleton loading={!user}>
            {user && user.role === "ADMIN" ? (
                <Grid templateColumns="auto 1fr" h="full" minH="100vh" w="full" gap={12}>
                    <GridItem minW="250px">
                        <HStack width="full" height="100%" alignItems="start">
                            <Sidebar current="inventory" />
                            <Separator orientation="vertical" size="md" borderColor="secondary.100" height="100%" />
                        </HStack>
                    </GridItem>
                    <GridItem w="75%" marginX="auto">
                        <InventorySection />
                    </GridItem>
                </Grid>
            ) : (
                <Grid>
                    <Text>You are not authorized to access this page</Text>
                </Grid>
            )}
        </Skeleton>
    )
}
