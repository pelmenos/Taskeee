import React, { ComponentProps } from "react"
import { VK } from "shared/ui/assets/icons/VK"
import { Yandex } from "shared/ui/assets/icons/Yandex"
import { Telegram } from "shared/ui/assets/icons/Telegram"
import { Center, Paper, SimpleGrid } from "@mantine/core"

interface Props extends ComponentProps<typeof SimpleGrid> {
}

export const FormSocials = (props: Props) => (
  <SimpleGrid
    cols={3}
    spacing="1rem"
    {...props}
  >
    <Paper
      bg="#2787F5"
      radius="sm"
      h="2.5rem"
    >
      <Center h="100%">
        <VK />
      </Center>
    </Paper>

    <Paper
      bg="#1C1C1E"
      radius="sm"
      h="2.5rem"
    >
      <Center h="100%">
        <Yandex />
      </Center>
    </Paper>

    <Paper
      bg="#25A3E0"
      radius="sm"
      h="2.5rem"
    >
      <Center h="100%">
        <Telegram />
      </Center>
    </Paper>
  </SimpleGrid>
)

