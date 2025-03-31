import "./ThemeToggle.scss"

import { UnstyledButtonProps , Box, UnstyledButton, useMantineColorScheme } from "@mantine/core"

import { MoonIcon } from "../assets/icons/MoonIcon"
import { SunIcon } from "../assets/icons/SunIcon"

interface Props extends Omit<UnstyledButtonProps, "onClick"> {

}

export const ThemeToggle = (props: Props) => {
  const { colorScheme, setColorScheme } = useMantineColorScheme()

  const onClick = () => setColorScheme(colorScheme === "dark" ? "light" : "dark")

  return (
    <UnstyledButton
      className="theme-toggle"
      onClick={onClick}
      {...props}
    >
      <Box className="theme-toggle__control">
        <MoonIcon
          w="1.25rem"
          h="1.25rem"
          className="theme-toggle__icon moon"
        />
      </Box>

      <Box className="theme-toggle__control">
        <SunIcon
          w="1.25rem"
          h="1.25rem"
          className="theme-toggle__icon sun"
        />
      </Box>
    </UnstyledButton>
  )
}
