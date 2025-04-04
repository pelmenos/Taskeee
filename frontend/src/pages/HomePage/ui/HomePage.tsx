import { useUnit } from "effector-react"
import { Image, Paper } from "@mantine/core"
import { MainLayout } from "widgets/MainLayout"
import { Onboarding } from "widgets/Onboarding"
import CellingLight from "shared/ui/assets/images/CeilingLight.png"
import { $onboardingIsVisible } from "../model"

export const HomePage = () => {
	const onboardingIsVisible = useUnit($onboardingIsVisible)

	return (
		<MainLayout display="grid">
			<Paper bg="surface" p="xl" pos="relative">
				{onboardingIsVisible && (
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
				)}
			</Paper>
		</MainLayout>
	)
}
