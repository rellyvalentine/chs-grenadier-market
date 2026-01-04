import { createSystem, defineConfig, defaultConfig, defineRecipe, defineTextStyles } from "@chakra-ui/react"

export const textStyles = defineTextStyles({
  heading: {
    value: {
      fontFamily: "Segoe UI, sans-serif",
      fontWeight: "bold",
      fontSize: "4xl",
      letterSpacing: "tight",
      lineHeight: "1.2",
      textTransform: "uppercase",
    }
  },
  body: {
    value: {
      fontFamily: "Segoe UI, sans-serif",
      fontWeight: "normal",
      fontSize: "lg",
      letterSpacing: "normal",
      lineHeight: "1.5",
    }
  }
})

export const customConfig = defineConfig({
  globalCss: {
    body: {
      bg: "#FAFBFC",
      fontFamily: "Segoe UI, sans-serif",
      color: "secondary.950",
    },
  },
  theme: {
    tokens: {
      colors: {
        primary: {
          50: { value: "#FDE8EB" },
          100: { value: "#F9BEC8" },
          200: { value: "#F594A4" },
          300: { value: "#F16A80" },
          400: { value: "#ED405D" },
          500: { value: "#E91639" },
          600: { value: "#C41230" },
          700: { value: "#950E24" },
          800: { value: "#950E24" },
          900: { value: "#410610" },
          950: { value: "#170206" },
        },
        secondary: {
          50: { value: "#E6E8EC" },
          100: { value: "#CED1DA" },
          200: { value: "#B7BBC8" },
          300: { value: "#A0A5B6" },
          400: { value: "#898FA4" },
          500: { value: "#737B93" },
          600: { value: "#5D6782" },
          700: { value: "#475371" },
          800: { value: "#324060" },
          900: { value: "#1C2F51" },
          950: { value: "#011E41" },
        },
      },
    },
  },
})

export const buttonRecipe = defineRecipe({
  variants: {
    variant: {
      solid: {
        bg: "primary.600",
        color: "white",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: 'primary.800',
        borderBottomWidth: "4px",
        borderBottomStyle: "solid",
        borderBottomColor: 'primary.800',
        borderRadius: ".75rem",
        fontSize: "16px",
        fontWeight: "bold",
        height: "auto",
        padding: ".5rem 1rem",
        transitionDuration: '.15s',
          _hover: { transitionTimingFunction: "cubic-bezier(.4,0,.2,1)", backgroundColor: "primary.500", borderColor: "primary.700", borderBottomColor: "primary.700", color: "white", cursor: "pointer" },
        _active: { backgroundColor: "primary.500", borderBottom: "1px solid", transform: "translate(0px, 1px)" },
      },
      outline: {
        bg: "white",
        border: "1px solid",
        borderBottom: '4px solid',
        borderColor: 'primary.600',
        borderRadius: ".75rem",
        color: 'primary.600',
        fontSize: "16px",
        fontWeight: "bold",
        height: "auto",
        padding: ".5rem 1rem",
        transitionDuration: '.15s',
          _hover: { transitionTimingFunction: "cubic-bezier(.4,0,.2,1)", backgroundColor: "white", borderColor: "primary.400", color: "primary.400", cursor: "pointer" },
        _active: { backgroundColor: "white", borderBottom: "1px solid", transform: "translate(0px, 1px)" },
      },
      outlineSecondary: {
        bg: "white",
        border: "1px solid",
        borderBottom: '4px solid',
        borderColor: 'secondary.950',
        borderRadius: ".75rem",
        color: 'secondary.950',
        fontSize: "16px",
        fontWeight: "bold",
        height: "auto",
        padding: ".5rem 1rem",
        transitionDuration: '.15s',
          _hover: { transitionTimingFunction: "cubic-bezier(.4,0,.2,1)", backgroundColor: "white", borderColor: "secondary.600", color: "secondary.600", cursor: "pointer" },
        _active: { backgroundColor: "white", borderBottom: "1px solid", transform: "translate(0px, 1px)" },
      },
    },
  },
})

export default createSystem(defaultConfig, customConfig, {
  theme: {
    textStyles: textStyles,
    recipes: { button: buttonRecipe },
  },
})