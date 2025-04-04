import "./CurrentBoard.scss"
import { Box, BoxProps, Group, Image, Paper } from "@mantine/core"
import { useUnit } from "effector-react"
import { projectModel } from "features/current-space"
import CellingLight from "shared/ui/assets/images/CeilingLight.png"
import { Column } from "./Column"

interface Props extends BoxProps {}

export const CurrentBoard = (props: Props) => {
	const columns = useUnit(projectModel.$columns)

	if (!Object.keys(columns).length) {
		return (
			<Paper bg="surface" pos="relative" flex={1}>
				<Image
					src={CellingLight}
					fit="contain"
					pos="absolute"
					h="calc(100% - 50px)"
					w="fit-content"
					top={0}
					right={150}
				/>
			</Paper>
		)
	}

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
