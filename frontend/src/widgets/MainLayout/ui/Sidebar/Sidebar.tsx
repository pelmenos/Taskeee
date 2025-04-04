import "./Sidebar.scss"

import { Group, NavLink, Paper, PaperProps, Stack, Text } from "@mantine/core"

import { Logo } from "shared/ui/Logo"
import { ChevronRightIcon } from "shared/ui/assets/icons/ChevronRightIcon"
import { CategoryIcon } from "shared/ui/assets/icons/CategoryIcon"
import { Link } from "atomic-router-react"
import { routes } from "shared/routing"
import { clsx } from "clsx"
import { HomeIcon } from "shared/ui/assets/icons/HomeIcon"

const NAV = [
	{ Icon: HomeIcon, label: "Главная", route: routes.home },
	{ Icon: CategoryIcon, label: "Проекты", route: routes.project.list },
]

interface Props extends PaperProps {
	isOpen?: boolean
}

export const Sidebar = ({ isOpen, className, ...props }: Props) => {
	return (
		<Paper
			component="aside"
			w={isOpen ? "16.25rem" : "4.5rem"}
			bg="surface"
			className={clsx("main-layout__sidebar", className)}
			{...props}
		>
			<Stack gap="xxl" align={isOpen ? "initial" : "center"} py="1.25rem" h="100%">
				{isOpen ? (
					<Group justify="space-between" px="1.25rem">
						<Logo />

						<Text c="onSurfaceVariant">Release 1.0.0</Text>
					</Group>
				) : (
					<Logo onlyIcon />
				)}

				<Stack component="nav" flex={1} px="md" gap="lg">
					{NAV.map(({ Icon, label, route }, index) => (
						<NavLink
							component={Link}
							to={route}
							className="nav__link"
							key={index}
							label={label}
							variant="light"
							leftSection={<Icon />}
							rightSection={<ChevronRightIcon />}
							data-close={!isOpen}
						/>
					))}
				</Stack>
			</Stack>
		</Paper>
	)
}
