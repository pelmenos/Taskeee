import {localStorageColorSchemeManager, MantineProvider} from "@mantine/core"
import {RouterProvider} from "atomic-router-react"
import {initTheme} from "../lib/theme/theme"
import {Pages, router} from "../router/pages"

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
