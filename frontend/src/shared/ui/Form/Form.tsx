import React, { ComponentProps } from "react"
import { Paper, Stack } from "@mantine/core"

interface Props extends ComponentProps<typeof Paper<"form">> {
}

export const Form = ({ children, ...props }: Props) => {
  return (
    <Paper
      component="form"
      bg="surface"
      p="2.5rem"
      radius="xxl"
      {...props}
    >
      <Stack gap="lg">
        {children}
      </Stack>
    </Paper>
  )
}
