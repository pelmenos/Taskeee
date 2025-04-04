import "./UserMenu.scss"
import {
	Box,
	Group,
	Image,
	Menu,
	MenuDropdown,
	MenuItem,
	MenuTarget,
	Stack,
	Text,
	UnstyledButton,
	UnstyledButtonProps,
} from "@mantine/core"

import { ChevronDownIcon } from "shared/ui/assets/icons/ChevronDownIcon"
import { $user, logouted } from "shared/api"
import { useUnit } from "effector-react"
import { ExitIcon } from "shared/ui/assets/icons/ExitIcon"

interface Props extends UnstyledButtonProps {}

export const UserMenu = (props: Props) => {
	const user = useUnit($user)
	const logout = useUnit(logouted)

	return (
		<Menu>
			<MenuTarget>
				<UnstyledButton
					h="3rem"
					bg="surfaceHighest"
					px="xxs"
					style={(theme) => ({
						display: "flex",
						alignItems: "center",
						gap: theme.spacing.md,
						borderRadius: theme.radius.md,
					})}
					{...props}
				>
					<Image
						w="2.25rem"
						h="2.25rem"
						radius="max"
						src={user?.avatar}
						fallbackSrc="https://imgur.com/gwHhOGF.gif"
						alt="avatar"
					/>

					<Box>
						<Text ff="Montserrat, serif" fw={600} maw="14.375rem">
							{user?.name}
						</Text>

						<Text ff="Montserrat, serif" fz="sm">
							{user?.email}
						</Text>
					</Box>

					<ChevronDownIcon />
				</UnstyledButton>
			</MenuTarget>

			<MenuDropdown>
				<Group h="3rem" px="xxs" align="center">
					<Image
						w="2.25rem"
						h="2.25rem"
						radius="max"
						src={user?.avatar}
						fallbackSrc="https://imgur.com/gwHhOGF.gif"
						alt="avatar"
					/>

					<Box>
						<Text ff="Montserrat, serif" fw={600} maw="14.375rem">
							{user?.name}
						</Text>

						<Text ff="Montserrat, serif" fz="sm">
							{user?.email}
						</Text>
					</Box>
				</Group>

				<Stack mt="lg">
					<MenuItem leftSection={<ExitIcon />} onClick={logout}>
						Выйти из аккаунта
					</MenuItem>
				</Stack>
			</MenuDropdown>
		</Menu>
	)
}
