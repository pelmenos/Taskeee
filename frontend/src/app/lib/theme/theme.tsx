import "./styles/index.scss"
import { Checkbox, createTheme, rem, TextInput } from "@mantine/core"
import { COLORS } from "./colors"

export const initTheme = () =>
  createTheme({
    fontFamily: "Manrope, sans-serif",

    colors: COLORS,

    primaryColor: "primary",

    radius: {
      xxl: rem(20),
      xl: rem(16),
      lg: rem(12),
      md: rem(10),
      sm: rem(8),
      xs: rem(4),
    },

    spacing: {
      xxl: rem(32),
      xl: rem(24),
      lg: rem(16),
      md: rem(12),
      sm: rem(10),
      xs: rem(8),
      xxs: rem(6),
    },

    defaultRadius: "md",

    components: {
      Checkbox: Checkbox.extend({
        vars: (theme) => ({
          root: {
            "--checkbox-color": "transparent",
            "--checkbox-icon-color": "primary",
            "--checkbox-radius": theme.radius.xs,
          },
        }),
        styles: (theme) => ({
          input: {
            background: "transparent",
            borderColor: theme.colors.primary[0],
          },
          label: {
            fontSize: rem(14),
            fontWeight: 400,
          },
        }),
      }),

      TextInput: TextInput.extend({
        defaultProps: {
          fz: {
            "base": rem(14),
            "512px": rem(12),
          },
          ff: "Montserrat, serif",
        },
        styles: () => ({
          input: {
            border: "0",
          },
        }),
      }),
    },

  })
