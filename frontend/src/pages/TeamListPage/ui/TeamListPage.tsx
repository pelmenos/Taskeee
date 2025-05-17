import "./TeamListPage.scss"
import {Button, Group, Paper, Table, Title} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {useUnit} from "effector-react";
import {AddMemberModal} from "features/AddMemberModal";
import {CreateRoleModal} from "features/CreateRoleModal";
import {spaceModel} from "features/current-space";
import {PlusIcon} from "shared/ui/assets/icons/PlusIcon";
import {MainLayout} from "widgets/MainLayout";


export const TeamListPage = () => {
  const members = useUnit(spaceModel.$availableMembers)

  const [addMemberModalOpened, addMemberModalControls] = useDisclosure(false)
  const [createRoleModalOpened, createRoleModalControls] = useDisclosure(false)

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

        <Table
          mt="md"
          horizontalSpacing="xl"
          striped="even"
          stripedColor="surfaceHighest"
          withRowBorders={false}
          layout="auto"
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th w={100} bg="surfaceHighest">№</Table.Th>
              <Table.Th w={250} bg="surfaceHighest">Эл. почта</Table.Th>
              <Table.Th bg="surfaceHighest">Роль</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {members.map((member, idx) => (
              <Table.Tr key={idx}>
                <Table.Td>{idx + 1}</Table.Td>
                <Table.Td>{member.email}</Table.Td>
                <Table.Td>
                  <Paper
                    bg={idx % 2 !== 0 ? "primary" : "yellow"}
                    c={idx % 2 !== 0 ? "white" : "gray.7"}
                    w="fit-content"
                    h="100%"
                    px="xl"
                    py="xs"
                  >
                    {member.role.name}
                  </Paper>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>

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
