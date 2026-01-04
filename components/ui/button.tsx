"use client"

import { Box, chakra, useRecipe } from "@chakra-ui/react"
import { buttonRecipe } from "../../styles/theme"
import type { RecipeVariantProps } from "@chakra-ui/react"

type ButtonVariantProps = RecipeVariantProps<typeof buttonRecipe>

export interface ButtonProps
  extends React.PropsWithChildren<ButtonVariantProps> {}

export const Button = (props: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    const { variant, ...restProps } = props
    const recipe = useRecipe({ recipe: buttonRecipe })
    const styles = recipe({ variant })
    return <Box display="flex" alignItems="end" minH="50px"><chakra.button css={styles} {...props} /></Box>
}