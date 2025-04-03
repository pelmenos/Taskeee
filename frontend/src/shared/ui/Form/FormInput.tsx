import React from "react"
import { TextInputProps , TextInput } from "@mantine/core";

import { Icon } from "../SvgIcon"

interface Props extends TextInputProps {
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
