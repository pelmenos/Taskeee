import { colorsTuple, virtualColor } from "@mantine/core"

export const COLORS = {
  darkPrimary: colorsTuple("#af38ff"),
  darkOnPrimary: colorsTuple("#ffffff"),

  darkSurfaceLowest: colorsTuple("#1c1b1f"),
  darkOnSurfaceLowestVariant: colorsTuple("#a2a2a2"),

  darkSurface: colorsTuple("#252c32"),
  darkOnSurface: colorsTuple("#eaeaea"),
  darkOnSurfaceVariant: colorsTuple("#a2a2a2"),
  darkSurfaceOutline: colorsTuple("#a2a2a2"),
  darkSurfaceOutlineVariant: colorsTuple("#dadada"),

  darkSurfaceHighest: colorsTuple("#1c1b1f"),
  darkSurfaceHighestOutline: colorsTuple("#a2a2a2"),
  darkOnSurfaceHighest: colorsTuple("#dadada"),
  darkOnSurfaceHighestVariant: colorsTuple("#a2a2a2"),
  darkSurfaceHighestActive: colorsTuple("#e1e4ff"),
  darkOnSurfaceHighestActive: colorsTuple("#384cff"),
  darkSurfaceHighestHover: colorsTuple("#1e1f2e"),
  darkOnSurfaceHighestHover: colorsTuple("#dadada"),


  lightPrimary: colorsTuple("#384cff"),
  lightOnPrimary: colorsTuple("#ffffff"),

  lightSurfaceLowest: colorsTuple("#fbfbfc"),
  lightOnSurfaceLowestVariant: colorsTuple("#808080"),

  lightSurface: colorsTuple("#ffffff"),
  lightOnSurface: colorsTuple("#46474e"),
  lightOnSurfaceVariant: colorsTuple("#808080"),
  lightSurfaceOutline: colorsTuple("#a5a5a5"),
  lightSurfaceOutlineVariant: colorsTuple("#1e1f2e"),

  lightSurfaceHighest: colorsTuple("#fafafa"),
  lightSurfaceHighestOutline: colorsTuple("#28303f"),
  lightOnSurfaceHighest: colorsTuple("#1e1f2e"),
  lightOnSurfaceHighestVariant: colorsTuple("#8d8e99"),
  lightSurfaceHighestActive: colorsTuple("#e1e4ff"),
  lightOnSurfaceHighestActive: colorsTuple("#384cff"),
  lightSurfaceHighestHover: colorsTuple("#ffffff"),
  lightOnSurfaceHighestHover: colorsTuple("#46474e"),


  primary: virtualColor(
    {
      name: "primary",
      dark: "darkPrimary",
      light: "lightPrimary",
    }),
  onPrimary: virtualColor({
    name: "onPrimary",
    dark: "darkOnPrimary",
    light: "lightOnPrimary",
  }),

  surfaceLowest: virtualColor({
    name: "surfaceLowest",
    dark: "darkSurfaceLowest",
    light: "lightSurfaceLowest",
  }),
  onSurfaceLowestVariant: virtualColor({
    name: "onSurfaceLowestVariant",
    dark: "darkOnSurfaceLowestVariant",
    light: "lightOnSurfaceLowestVariant",
  }),

  surface: virtualColor({
    name: "surface",
    dark: "darkSurface",
    light: "lightSurface",
  }),
  onSurface: virtualColor({
    name: "onSurface",
    dark: "darkOnSurface",
    light: "lightOnSurface",
  }),
  onSurfaceVariant: virtualColor({
    name: "onSurfaceVariant",
    dark: "darkOnSurfaceVariant",
    light: "lightOnSurfaceVariant",
  }),
  surfaceOutline: virtualColor({
    name: "surfaceOutline",
    dark: "darkSurfaceOutline",
    light: "lightSurfaceOutline",
  }),
  surfaceOutlineVariant: virtualColor({
    name: "surfaceOutlineVariant",
    dark: "darkSurfaceOutlineVariant",
    light: "lightSurfaceOutlineVariant",
  }),

  surfaceHighest: virtualColor({
    name: "surfaceHighest",
    dark: "darkSurfaceHighest",
    light: "lightSurfaceHighest",
  }),
  surfaceHighestOutline: virtualColor({
    name: "surfaceHighestOutline",
    dark: "darkSurfaceHighestOutline",
    light: "lightSurfaceHighestOutline",
  }),
  onSurfaceHighest: virtualColor({
    name: "onSurfaceHighest",
    dark: "darkOnSurfaceHighest",
    light: "lightOnSurfaceHighest",
  }),
  onSurfaceHighestVariant: virtualColor({
    name: "onSurfaceHighestVariant",
    dark: "darkOnSurfaceHighestVariant",
    light: "lightOnSurfaceHighestVariant",
  }),
  surfaceHighestActive: virtualColor({
    name: "surfaceHighestActive",
    dark: "darkSurfaceHighestActive",
    light: "lightSurfaceHighestActive",
  }),
  onSurfaceHighestActive: virtualColor({
    name: "onSurfaceHighestActive",
    dark: "darkOnSurfaceHighestActive",
    light: "lightOnSurfaceHighestActive",
  }),
  surfaceHighestHover: virtualColor({
    name: "surfaceHighestHover",
    dark: "darkSurfaceHighestHover",
    light: "lightSurfaceHighestHover",
  }),
  onSurfaceHighestHover: virtualColor({
    name: "onSurfaceHighestHover",
    dark: "darkOnSurfaceHighestHover",
    light: "lightOnSurfaceHighestHover",
  }),

} as const
