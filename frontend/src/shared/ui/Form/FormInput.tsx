import React, { ComponentProps } from "react"
import { Icon } from "../SvgIcon"
import { TextInput } from "@mantine/core"

interface Props extends ComponentProps<typeof TextInput> {
  icon: Icon
}

export const FormInput = ({ icon: Icon, ...props }: Props) => {
  return (
    <TextInput
      styles={{
        input: {
          height: "3.5rem",
          background: "var(--mantine-color-surfaceHighest-1)",
        },
      }}
      c="onSurfaceHighest"
      leftSectionWidth="2.875rem"
      leftSection={
        <Icon
          flex="0 0 1.25rem"
          ml="1.25rem"
          mr="0.5rem"
        />
      }
      {...props}
    />
  )
}
