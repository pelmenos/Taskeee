import "./ProjectDetailPage.scss"
import { MainLayout } from "widgets/MainLayout"
import { Group } from "@mantine/core"
import { routes } from "shared/routing"
import { Boards } from "./Boards"
import { CurrentBoard } from "./CurrentBoard"

export const ProjectDetailPage = () => {
	return (
		<MainLayout>
			<Group align="stretch" gap="xl" wrap="nowrap">
				<Boards backRoute={routes.project.list} />

				<CurrentBoard flex={1} />
			</Group>
		</MainLayout>
	)
}
