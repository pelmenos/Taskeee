import { DefaultMantineColor, MantineColorsTuple } from "@mantine/core"

type ExtendedCustomColors =
  | DefaultMantineColor
  | "onPrimary"
  | "primary"
  | "surfaceLowest"
  | "onSurfaceLowestVariant"
  | "surface"
  | "onSurface"
  | "onSurfaceVariant"
  | "surfaceOutline"
  | "surfaceOutlineVariant"
  | "surfaceHighest"
  | "surfaceHighestOutline"
  | "onSurfaceHighest"
  | "onSurfaceHighestVariant"
  | "surfaceHighestActive"
  | "onSurfaceHighestActive"
  | "surfaceHighestHover"
  | "onSurfaceHighestHover"

declare module "@mantine/core" {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, MantineColorsTuple>;
  }
}
