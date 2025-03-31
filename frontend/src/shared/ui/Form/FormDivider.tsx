import { Divider, Text } from "@mantine/core"
import React from "react"

export const FormDivider = () => (
  <Divider
    labelPosition="center"
    label={
      <Text
        ff="Montserrat, serif"
        fz="1rem"
        mx="0.5rem"
      >
        или
      </Text>
    }
  />
)
