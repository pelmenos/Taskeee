import { useUnit } from "effector-react"
import { Paper } from "@mantine/core"
import { MainLayout } from "widgets/MainLayout"
import { Onboarding } from "widgets/Onboarding"
import { $onboardingIsVisible } from "../model"

export const HomePage = () => {
	const onboardingIsVisible = useUnit($onboardingIsVisible)

	return (
		<MainLayout display="grid">
			<Paper bg="surface" p="xl">
				{onboardingIsVisible && <Onboarding />}
			</Paper>
		</MainLayout>
	)
}
