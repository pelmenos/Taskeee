import {Box, Group, Paper, Stack} from "@mantine/core"
import {ComponentProps, useState} from "react"
import {Sidebar} from "./Sidebar"
import {Header} from "./Header"
import {useGate} from "effector-react"
import {mainLayoutModel} from "../model/main-layout-model"

interface Props extends ComponentProps<typeof Paper<"main">> {

}

export const MainLayout = ({children, ...props}: Props) => {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(true)

  useGate(mainLayoutModel.Gate)

  const onSidebarToggle = () => setSidebarIsOpen(prev => !prev)

  return (
    <Group
      mih="100vh"
      bg="surfaceLowest"
      p="xl"
      gap="xl"
      wrap="nowrap"
      align="stretch"
    >
      <Sidebar flex="0 0 auto" isOpen={sidebarIsOpen}/>

      <Stack flex="auto" gap="xl">
        <Header onSidebarToggle={onSidebarToggle}/>

        <Box
          component="main"
          h="calc(100vh - 4rem - 1.5rem * 3)"
          display="grid"
          {...props}
        >
          {children}
        </Box>
      </Stack>

    </Group>
  )
}
