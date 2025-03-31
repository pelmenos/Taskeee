import React from "react"
import { SimpleGridProps , Center, Paper, SimpleGrid } from "@mantine/core"

import { VK } from "../assets/icons/VK"
import { Yandex } from "../assets/icons/Yandex"
import { Telegram } from "../assets/icons/Telegram"

interface Props extends SimpleGridProps {
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

