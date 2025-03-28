import React, { ComponentProps } from "react"
import { Text } from "@mantine/core"

interface Props extends ComponentProps<typeof Text<"span">> {
}

export const FormText = ({ children, ...props }: Props) => {
  return (
    <Text
      ff="Montserrat, serif"
      fz="0.825rem"
      fw={400}
      c="onSurface"
      span
      {...props}>
      {children}
    </Text>
  )
}
