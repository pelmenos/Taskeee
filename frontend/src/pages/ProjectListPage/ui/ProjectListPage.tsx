import "./ProjectListPage.scss"
import {Button, Group, Paper, SimpleGrid, Stack, Text, TextInput, Title} from "@mantine/core"
import {useDisclosure} from "@mantine/hooks"
import {Link} from "atomic-router-react"
import {useUnit} from "effector-react"
import {CreateProjectModal} from "features/CreateProjectModal"
import {projectModel} from "features/current-space"
import {useEffect, useState} from "react";
import {routes} from "shared/routing"
import {MagnifyIcon} from "shared/ui/assets/icons/MagnifyIcon"
import {PlusIcon} from "shared/ui/assets/icons/PlusIcon"
import {MainLayout} from "widgets/MainLayout"

export const ProjectListPage = () => {
  const setSearchQuery = useUnit(projectModel.searchQueryChanged)

  const [opened, {open, close}] = useDisclosure(false)

  const [query, setQuery] = useState("")

  useEffect(() => {
    setSearchQuery(query)
  }, [query, setSearchQuery]);

  const availableProjects = useUnit(projectModel.$availableProjects)

  return (
    <MainLayout>
      <Paper
        bg="surface"
        p="xl"
        pos="relative"
      >
        <Stack>
          <Group justify="space-between">
            <Group
              wrap="nowrap"
              align="start"
              gap="sm"
            >
              <Title
                order={1}
                size="h2"
              >
                Все проекты
              </Title>

              <Text
                c="onSurfaceVariant"
                fw={600}
                fz="md"
                span
              >
                {availableProjects.length}
              </Text>
            </Group>

            <Group>
              <TextInput
                size="md"
                placeholder="Поиск"
                leftSection={<MagnifyIcon />}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />

              <Button
                size="md"
                leftSection={<PlusIcon />}
                onClick={open}
              >
                Добавить проект
              </Button>
            </Group>
          </Group>

          <SimpleGrid cols={6}>
            {availableProjects.map((item) => (
              <Button
                key={item.id}
                component={Link<{ id: string }>}
                to={routes.project.detail}
                params={{id: item.id}}
              >
                {item.name}
              </Button>
            ))}
          </SimpleGrid>
        </Stack>
      </Paper>

      <CreateProjectModal
        opened={opened}
        onClose={close}
      />
    </MainLayout>
  )
}
