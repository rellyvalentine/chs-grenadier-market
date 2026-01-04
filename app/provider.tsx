"use client"

import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import ConvexClientProvider from "@/components/ConvexClientProvider";
import customConfig from "@/styles/theme";

export default function RootLayout(props: { children: React.ReactNode }) {

    return (
        <ChakraProvider value={customConfig}>
            <ConvexClientProvider>
                {props.children}
            </ConvexClientProvider>
        </ChakraProvider>
    )

}

