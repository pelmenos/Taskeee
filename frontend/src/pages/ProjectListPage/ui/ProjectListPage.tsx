import "./ProjectListPage.scss"
import { MainLayout } from "widgets/MainLayout"
import {
	Button,
	Group,
	Image,
	Paper,
	SimpleGrid,
	Stack,
	Text,
	TextInput,
	Title,
} from "@mantine/core"
import { PlusIcon } from "shared/ui/assets/icons/PlusIcon"
import { MagnifyIcon } from "shared/ui/assets/icons/MagnifyIcon"
import { CreateProjectModal, projectModel } from "features/current-space"
import { useUnit } from "effector-react"
import { useDisclosure } from "@mantine/hooks"
import { Link } from "atomic-router-react"
import { routes } from "shared/routing"
import { useEffect, useRef, useState } from "react"
import Fuse from "fuse.js"
import { ProjectListItem } from "entities/project"
import { Onboarding } from "widgets/Onboarding"
import CellingLight from "shared/ui/assets/images/CeilingLight.png"
import { $onboardingIsVisible } from "../model"

export const ProjectListPage = () => {
	const [opened, { open, close }] = useDisclosure(false)
	const [query, setQuery] = useState("")

	const availableProjects = useUnit(projectModel.$availableProjects)
	const onboardingIsVisible = useUnit($onboardingIsVisible)

	const fuse = useRef<Fuse<ProjectListItem> | null>(null)

	useEffect(() => {
		fuse.current = new Fuse(availableProjects, {
			keys: ["name"],
		})
	}, [fuse, availableProjects])

	const projects = query
		? fuse.current?.search(query).map((item) => item.item) ?? []
		: availableProjects

	return (
		<MainLayout>
			<Paper bg="surface" p="xl">
				{onboardingIsVisible ? (
					<>
						<Onboarding />

						<Image
							src={CellingLight}
							fit="contain"
							pos="absolute"
							h="calc(100% - 50px)"
							w="fit-content"
							top={0}
							right={150}
						/>
					</>
				) : (
					<Stack>
						<Group justify="space-between">
							<Group wrap="nowrap" align="start" gap="sm">
								<Title order={1} size="h2">
									Все проекты
								</Title>

								<Text c="onSurfaceVariant" fw={600} fz="md" span>
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

								<Button size="md" leftSection={<PlusIcon />} onClick={open}>
									Добавить проект
								</Button>
							</Group>
						</Group>

						<SimpleGrid cols={6}>
							{projects.map((item) => (
								<Button
									key={item.id}
									component={Link<{ id: string }>}
									to={routes.project.detail}
									params={{ id: item.id }}
								>
									{item.name}
								</Button>
							))}
						</SimpleGrid>
					</Stack>
				)}
			</Paper>

			<CreateProjectModal opened={opened} onClose={close} />
		</MainLayout>
	)
}
