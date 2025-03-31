import "./ProjectDetailPage.scss"
import { ComponentProps } from "react"
import { MainLayout } from "widgets/layouts/MainLayout"
import { Button, Group, Paper, Stack } from "@mantine/core"
import { ChevronLeftIcon } from "shared/ui/assets/icons/ChevronLeftIcon"
import { PlusIcon } from "shared/ui/assets/icons/PlusIcon"
import { Link } from "atomic-router-react"
import { routes } from "shared/routing"


interface Props extends ComponentProps<"div"> {

}

export const ProjectDetailPage = ({}: Props) => {
  return (
    <MainLayout>
      <Group
        align="stretch"
        gap="xl"
      >
        <Paper
          bg="surface"
          p="xl"
          w={260}
        >
          <Stack gap="xl">
            <Button
              component={Link}
              to={routes.project.list}
              size="xs"
              w="fit-content"
              bg="black"
              leftSection={<ChevronLeftIcon />}
            >
              Назад
            </Button>

            <Button
              size="md"
              leftSection={
                <PlusIcon />
              }
            >
              Создать доску
            </Button>

          </Stack>
        </Paper>

        <Paper
          bg="surface"
          p="xl"
          flex={1}
        >

        </Paper>
      </Group>
    </MainLayout>
  )
}
