import "./SpaceMenu.scss"
import { ComponentProps } from "react"
import { Group, Menu, MenuDropdown, MenuTarget, Paper, Text, UnstyledButton } from "@mantine/core"
import { StackIcon } from "shared/ui/assets/icons/StackIcon"
import { ChevronRightIcon } from "shared/ui/assets/icons/ChevronRightIcon"
import { useUnit } from "effector-react"
import { currentSpaceModel } from "features/current-space/model"


interface Props extends ComponentProps<"div"> {

}

export const SpaceMenu = ({}: Props) => {
  const currentSpace = useUnit(currentSpaceModel.$currentSpace)
  const availableSpaces = useUnit(currentSpaceModel.$availableSpaces)

  return (
    <Menu>
      <MenuTarget>
        <UnstyledButton
          h="2.5rem"
          bd="1px solid var(--mantine-color-primary-0)"
          display="flex"
          style={(theme) => ({
            borderRadius: theme.radius.md,
            alignItems: "center",
            gap: theme.spacing.xxs,
          })}
        >
          <Paper
            component="span"
            bg="primary"
            h="100%"
          >
            <Group
              component="span"
              h="100%"
              align="center"
              px="md"
            >
              <StackIcon />

              <Text
                span
                ff="Montserrat, serif"
                c="onPrimary"
                fw={600}
              >
                Пространство
              </Text>
            </Group>
          </Paper>

          <Paper
            component="span"
            h="100%"
            bg="transparent"
          >
            <Group
              component="span"
              h="100%"
              align="center"
              px="md"
            >
              <Text
                span
                ff="Montserrat, serif"
                fw={600}
              >
                {currentSpace?.name ?? "У вас нет пространств"}
              </Text>

              <ChevronRightIcon />
            </Group>
          </Paper>
        </UnstyledButton>
      </MenuTarget>

      {!!availableSpaces.length && (
        <MenuDropdown>
          {availableSpaces.map(item => (
            <span key={item.id}>{item.name}</span>
          ))}
        </MenuDropdown>
      )}
    </Menu>
  )
}
