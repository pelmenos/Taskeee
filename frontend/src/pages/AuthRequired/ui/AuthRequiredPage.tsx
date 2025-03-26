import { MainLayout } from "widgets/layouts/MainLayout"
import { Onboarding } from "widgets/Onboarding"

export const AuthRequiredPage = () => {
  return (
    <MainLayout className="">
      <Onboarding />
    </MainLayout>
  )
}
