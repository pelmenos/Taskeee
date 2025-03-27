import { Button } from "shared/ui/Button"
import { useUnit } from "effector-react"
import { router } from "shared/routing"
import { $session, $user } from "shared/api"
import { logouted } from "shared/session/logouted"
import { Group, Paper, Text } from "@mantine/core"
import { MainLayout } from "widgets/layouts/MainLayout"
import { Onboarding } from "widgets/Onboarding"
import { $onboardingIsVisible } from "../model"


export const HomePage = () => {
  const {
    logout,
    user,
    session,
  } = useUnit({
    logout: logouted,
    user: $user,
    session: $session,
  })

  const onboardingIsVisible = useUnit($onboardingIsVisible)

  return (
    <MainLayout
      display="grid"
    >
      <Paper
        bg="surface"
        p="xl"
      >
        {onboardingIsVisible ? (
          <Onboarding />
        ) : (
          <Text>there has been onboarding</Text>
        )}

        <Button onClick={logout}>logout</Button>

        <Group>
          {router.routes.map(value =>
            <Text component="a" href={value.path} key={value.path}>
              {value.path}
            </Text>,
          )}
        </Group>

        <pre>
          {JSON.stringify(user, null, 2)}
        </pre>

        <pre>
          {JSON.stringify(session, null, 2)}
        </pre>

      </Paper>

    </MainLayout>
  )
}
