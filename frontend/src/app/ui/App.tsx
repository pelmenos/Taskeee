import { RouterProvider } from "atomic-router-react"
import { router } from "shared/routing"
import "shared/app/styles/index.css"
import { localStorageColorSchemeManager, MantineProvider } from "@mantine/core"
import { Pages } from "../router/pages"
import { initTheme } from "../lib/theme/theme"


export const App = () => {
  const theme = initTheme()

  return (
    <MantineProvider
      theme={theme}
      defaultColorScheme="auto"
      colorSchemeManager={localStorageColorSchemeManager({
        key: "mantine-ui-color-scheme",
      })}
    >
      <RouterProvider router={router}>
        <Pages />
      </RouterProvider>
    </MantineProvider>
  )
}
