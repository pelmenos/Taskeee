import "./ProjectDetailPage.scss"
import { MainLayout } from "widgets/MainLayout"
import { Group } from "@mantine/core"
import { routes } from "shared/routing"
import { useState } from "react"
import { Boards } from "./Boards"
import { CurrentBoard } from "./CurrentBoard"
import { Settings } from "./Settings"

export const ProjectDetailPage = () => {
	const [settinsIsOpen, setSettinsIsOpen] = useState(false)

	return (
		<MainLayout>
			<Group align="stretch" gap="xl" wrap="nowrap">
				{settinsIsOpen && <Settings onClose={() => setSettinsIsOpen(false)} />}

				<Boards backRoute={routes.project.list} onSettingsOpen={() => setSettinsIsOpen(true)} />

				<CurrentBoard flex={1} />
			</Group>
		</MainLayout>
	)
}
