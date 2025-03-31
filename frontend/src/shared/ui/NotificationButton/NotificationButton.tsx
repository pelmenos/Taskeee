import "./NotificationButton.scss"
import { ComponentProps } from "react"
import { Center, Flex } from "@mantine/core"
import { RingIcon } from "../assets/icons/RingIcon"


interface Props extends ComponentProps<typeof Flex> {

}

export const NotificationButton = (props: Props) => {
  return (
    <Center
      bg="surfaceHighest"

      w="3rem"
      h="2.5rem"
      style={(theme) => ({
        borderRadius: theme.radius.md,
      })}
      {...props}
    >
      <RingIcon
        w="1.25rem"
        h="1.25rem"
        c="onSurfaceHighest"
      />
    </Center>
  )
}
