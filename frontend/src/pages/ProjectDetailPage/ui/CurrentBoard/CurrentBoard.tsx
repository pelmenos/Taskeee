import "./CurrentBoard.scss"
import { Box, BoxProps, Group } from "@mantine/core"
import { useUnit } from "effector-react"
import { projectModel } from "features/current-space"
import { Column } from "./Column"

interface Props extends BoxProps {}

export const CurrentBoard = (props: Props) => {
	const columns = useUnit(projectModel.$columns)

	return (
		<Box {...props}>
			<Group align="stretch">
				{Object.entries(columns).map((item) => (
					<Column flex="0 0 300px" column={item[0]} tasks={item[1]} />
				))}
			</Group>
		</Box>
	)
}
