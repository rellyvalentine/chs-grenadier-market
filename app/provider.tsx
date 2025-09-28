"use client"

import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import ConvexClientProvider from "@/components/ConvexClientProvider";

export default function RootLayout(props: { children: React.ReactNode }) {

    return (
        <ChakraProvider value={defaultSystem}>
            <ConvexClientProvider>
                {props.children}
            </ConvexClientProvider>
        </ChakraProvider>
    )

}

