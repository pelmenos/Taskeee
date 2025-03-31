import "./ProjectListPage.scss"
import { MainLayout } from "widgets/layouts/MainLayout"
import { Button, Group, Paper, TextInput, Title } from "@mantine/core"
import { PlusIcon } from "shared/ui/assets/icons/PlusIcon"
import { MagnifyIcon } from "shared/ui/assets/icons/MagnifyIcon"
import { projectModel } from "features/current-space"
import { useUnit } from "effector-react"
import { CreateProjectModal } from "widgets/modals/CreateProjectModal"
import { useDisclosure } from "@mantine/hooks"


export const ProjectListPage = () => {

  const [opened, { open, close }] = useDisclosure(false);

  const availableProjects = useUnit(projectModel.$availableProjects)

  return (
    <MainLayout>
      <Paper
        bg="surface"
        p="xl"
      >
        <Group justify="space-between">
          <Title
            order={1}
            size="h2"
          >
            Все проекты
          </Title>
          <Group>
            <TextInput
              size="md"
              placeholder="Поиск"
              leftSection={
                <MagnifyIcon />
              }
            />

            <Button
              size="md"
              leftSection={
                <PlusIcon />
              }
              onClick={open}
            >
              Добавить проект
            </Button>
          </Group>
        </Group>

        <pre>
          {JSON.stringify(availableProjects, null, 2)}
        </pre>
      </Paper>

      <CreateProjectModal opened={opened} onClose={close} />
    </MainLayout>
  )
}
