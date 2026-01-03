import { createSystem, defaultConfig, defineRecipe } from "@chakra-ui/react"

const buttonRecipe = defineRecipe({
  variants: {
    variant: {
      outline: {
        bg: "white",
        border: "1px",
        borderBottom: '4px',
        borderColor: '#3ECD85',
        borderRadius: ".75rem",
        color: '#3ECD85',
        fontSize: "16px",
        fontWeight: "bold",
        height: "auto",
        padding: ".5rem 1rem",
        transitionDuration: '.15s',
        _hover: { transitionTimingFunction: "cubic-bezier(.4,0,.2,1)", backgroundColor: "white", borderColor: "#6EDAA4", color: "#6EDAA4" },
        _active: { backgroundColor: "white", borderBottom: "1px solid #36B374", transform: "translate(0px, 1px)" }
      },
    },
  },
})

const system = createSystem(defaultConfig, {
  theme: {
    recipes: { button: buttonRecipe },
  },
})