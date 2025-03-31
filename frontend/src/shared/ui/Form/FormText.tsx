import React, { ReactNode } from "react"

import { TextProps , Text } from "@mantine/core"


interface Props extends TextProps {
  children?: ReactNode
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
