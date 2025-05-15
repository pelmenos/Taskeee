import "./TeamListPage.scss"
import {Button, Group, Paper, Title} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {AddMemberModal} from "features/AddMemberModal";
import {CreateRoleModal} from "features/CreateRoleModal";
import {PlusIcon} from "shared/ui/assets/icons/PlusIcon";
import {MainLayout} from "widgets/MainLayout";


export const TeamListPage = () => {
  const [addMemberModalOpened, addMemberModalControls] = useDisclosure(false)
  const [createRoleModalOpened, createRoleModalControls] = useDisclosure(true)

  return (
    <MainLayout>
      <Paper
        bg="surface"
        p="xl"
        pos="relative"
      >
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
              Команда
            </Title>
          </Group>

          <Group>
            <Button
              size="md"
              leftSection={<PlusIcon />}
              onClick={addMemberModalControls.open}
            >
              Добавить пользователя
            </Button>

            <Button
              size="md"
              leftSection={<PlusIcon />}
              onClick={createRoleModalControls.open}
            >
              Добавить роль
            </Button>
          </Group>
        </Group>
      </Paper>

      <AddMemberModal
        opened={addMemberModalOpened}
        onClose={addMemberModalControls.close}
      />

      <CreateRoleModal
        opened={createRoleModalOpened}
        onClose={createRoleModalControls.close}
      />
    </MainLayout>
  )
}
