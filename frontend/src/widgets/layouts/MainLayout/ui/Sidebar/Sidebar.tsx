import "./Sidebar.scss"

import {Group, NavLink, Paper, Stack, Text} from "@mantine/core"
import {Logo} from "shared/ui/Logo"
import {HomeIcon} from "shared/ui/assets/icons/HomeIcon"
import {ChevronRightIcon} from "shared/ui/assets/icons/ChevronRightIcon"
import {WorkIcon} from "shared/ui/assets/icons/WorkIcon"
import {TwoUsersIcon} from "shared/ui/assets/icons/TwoUsersIcon"
import {CategoryIcon} from "shared/ui/assets/icons/CategoryIcon"
import {ChatIcon} from "shared/ui/assets/icons/ChatIcon"
import {StarIcon} from "shared/ui/assets/icons/StarIcon"
import {ClickIcon} from "shared/ui/assets/icons/ClickIcon"
import {HugeIcon} from "shared/ui/assets/icons/HugeIcon"
import {GraphIcon} from "shared/ui/assets/icons/GraphIcon"
import {Link} from "atomic-router-react"
import {routes} from "shared/routing"
import {ComponentProps} from "react";
import {clsx} from "clsx";

const NAV = [
  {Icon: HomeIcon, label: "Главная", route: routes.home},
  {Icon: TwoUsersIcon, label: "Команда", route: routes.home},
  {Icon: CategoryIcon, label: "Проекты", route: routes.project.list},
  {Icon: GraphIcon, label: "Финансы", route: routes.home},
  {Icon: StarIcon, label: "Задачи", route: routes.home},
  {Icon: ChatIcon, label: "Чаты", route: routes.home},
]

const FOOTER = [
  {Icon: WorkIcon, label: "Тарифный план", route: routes.home},
  {Icon: ClickIcon, label: "Инструменты", route: routes.home},
  {Icon: HugeIcon, label: "Обратная связь", route: routes.home},
]

interface Props extends ComponentProps<typeof Paper<"div">> {
  isOpen?: boolean
}

export const Sidebar = ({isOpen, className, ...props}: Props) => {

  return (
    <Paper
      component="aside"
      w={isOpen ? "16.25rem" : "4.5rem"}
      bg="surface"
      className={clsx("main-layout__sidebar", className)}
      {...props}
    >
      <Stack
        gap="xxl"
        align={isOpen ? "initial" : "center"}
        py="1.25rem"
        h="100%"
      >
        {isOpen ? (
          <Group
            justify="space-between"
            px="1.25rem"
          >
            <Logo/>

            <Text c="onSurfaceVariant">
              Release 1.0.0
            </Text>
          </Group>
        ) : (
          <Logo onlyIcon/>
        )}

        <Stack
          component="nav"
          flex={1}
          px="md"
          gap="lg"
        >
          {NAV.map(({Icon, label, route}, index) => (
            <NavLink
              component={Link}
              to={route}
              className="nav__link"
              key={index}
              label={label}
              variant="light"
              leftSection={
                <Icon/>
              }
              rightSection={
                <ChevronRightIcon/>
              }
              data-close={!isOpen}
            />
          ))}

        </Stack>

        <Stack
          gap={isOpen ? 0 : "md"}
          align={isOpen ? "initial" : "center"}
        >
          {FOOTER.map(({Icon, label, route}, index) => (
            <NavLink
              className="footer__link"
              component={Link}
              to={route}
              key={index}
              label={label}
              variant="light"
              leftSection={
                <Icon/>
              }
              rightSection={
                <ChevronRightIcon/>
              }
              data-close={!isOpen}
            />
          ))}

        </Stack>

      </Stack>
    </Paper>
  )
}
