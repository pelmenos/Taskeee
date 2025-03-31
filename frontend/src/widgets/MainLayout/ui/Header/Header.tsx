import { ActionIcon, Group, Paper } from "@mantine/core"
import { ThemeToggle } from "shared/ui/ThemeToggle/ThemeToggle"
import { NotificationButton } from "shared/ui/NotificationButton"
import { BurgerIcon } from "shared/ui/assets/icons/BurgerIcon"
import { UserMenu } from "./UserMenu"
import { SpaceMenu } from "./SpaceMenu"

interface Props {
  onSidebarToggle: () => void
}

export const Header = ({ onSidebarToggle }: Props) => {
  return (
    <Paper
      component="header"
      bg="surface"
      h="4rem"
    >
      <Group
        h="100%"
        align="center"
        justify="space-between"
        wrap="nowrap"
      >
        <ActionIcon
          onClick={onSidebarToggle}
          bg="transparent"
          ml="lg"
        >
          <BurgerIcon w="34px" />
        </ActionIcon>

        <Group
          h="100%"
          align="center"
          justify="space-between"
          wrap="nowrap"
        >
          <SpaceMenu/>

          <ThemeToggle />

          <NotificationButton />

          <UserMenu mr="xs" />
        </Group>
      </Group>
    </Paper>
  )
}
