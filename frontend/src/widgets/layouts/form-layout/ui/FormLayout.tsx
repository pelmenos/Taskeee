import React from "react"
import "./FormLayout.css"
import { Logo } from "shared/ui/Logo"
import { Center, Group, Stack, Text } from "@mantine/core"

interface Props {
  children?: React.ReactNode
}

export const FormLayout = ({ children }: Props) => {
  return (
    <Stack
      mih="100vh"
      bg="surfaceLowest"
    >
      <Group
        p="2.25rem 3rem"
        pos="absolute"
        top={0}
        left={0}
      >
        <Logo />
      </Group>

      <Center
        m="auto"
      >
        <Stack
          gap="xl"
          maw="27.5rem"
          m="0 1.75rem"
        >
          {children}

          <Text
            fz="xs"
            fw="500"
            ta="center"
            component="p"
            c="onSurfaceVariant"
          >
            Используя HPACE.CRM, Вы подтвреждение, что прочитали и поняли, а также соглашаетесь с
            правилами и условиями и Политикой конфиденциальности.
          </Text>
        </Stack>
      </Center>
    </Stack>
  )
}
