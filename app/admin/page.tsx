"use client"

import { Grid, Text } from "@chakra-ui/react"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api";

export default function AdminPage() {


    const user = useQuery(api.users.getCurrentUser);
    console.log(user);

    return (
        user && user.role === "ADMIN" ? (
            <Grid>
                <Text>Admin Page</Text>
            </Grid>
        ) : (
            <Grid>
                <Text>You are not authorized to access this page</Text>
            </Grid>
        )
    )
}
