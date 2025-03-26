import { Grid, GridCol, Paper, Stack } from "@mantine/core"
import { ComponentProps, useState } from "react"
import { Sidebar } from "./Sidebar"
import { Header } from "./Header"
import { useGate } from "effector-react"
import { mainLayoutModel } from "../model/main-layout-model"

interface Props extends ComponentProps<typeof Paper<"main">> {

}

export const MainLayout = ({ children, ...props }: Props) => {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(true)

  useGate(mainLayoutModel.Gate)

  const onSidebarToggle = () => setSidebarIsOpen(prev => !prev)

  return (
    <Grid
      mih="100vh"
      bg="surfaceLowest"
      p="xl"
      gutter="xl"
    >
      <GridCol
        maw="16.25rem"
        span="content"
      >
        <Sidebar isOpen={sidebarIsOpen} />

      </GridCol>

      <GridCol span="auto">

        <Stack gap="xl">
          <Header onSidebarToggle={onSidebarToggle} />

          <Paper
            component="main"
            bg="surface"
            h="calc(100vh - 4rem - 1.5rem * 3)"
            {...props}
          >
            {children}
          </Paper>
        </Stack>

      </GridCol>

    </Grid>
  )
}
