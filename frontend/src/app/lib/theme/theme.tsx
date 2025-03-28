import "./styles/index.scss"
import {Checkbox, createTheme, FileInput, rem, TextInput} from "@mantine/core"
import {colors} from "./colors"

export const initTheme = () =>
  createTheme({
    fontFamily: "Manrope, sans-serif",

    colors: colors,

    primaryColor: "primary",

    radius: {
      max: "calc(infinity * 1px)",
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

    fontSizes: {
      sm: rem(12),
      md: rem(14),
      lg: rem(16),
    },

    headings: {
      sizes: {
        h1: {
          fontSize: rem(32),
          fontWeight: "700",
          lineHeight: "1",
        },
        h2: {
          fontSize: rem(24),
          fontWeight: "500",
          lineHeight: "1",
        }
      },
      fontFamily: "Montserrat, serif",
    },

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
          variant: "filled",
        },
        styles: (theme) => ({
          input: {
            // border: "0",
            background: theme.colors.surfaceHighest[0]
          },
        }),
      }),

      FileInput: FileInput.extend({
        defaultProps: {
          ff: "Montserrat, serif",
          variant: "filled"
        },
        styles: (theme) => ({
          input: {
            // border: "0",
            background: theme.colors.surfaceHighest[0]
          },
        }),
      })
    },
  })
