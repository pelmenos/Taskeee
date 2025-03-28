import { MainLayout } from "widgets/layouts/MainLayout"
import { Onboarding } from "widgets/Onboarding"
import { Paper } from "@mantine/core"

export const AuthRequiredPage = () => {
  return (
    <MainLayout>
      <Paper
        bg="surface"
        p="xl"
      >
        <Onboarding />
      </Paper>
    </MainLayout>
  )
}
