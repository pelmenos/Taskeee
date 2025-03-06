import { RouterProvider } from "atomic-router-react"
import { ThemeProvider } from "shared/ui/ThemeProvider"
import { router } from "shared/routing"
import { Pages } from "pages/index"
import "shared/app/styles/index.css"


export const App = () => {
  return (
    <RouterProvider router={router}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <Pages />
      </ThemeProvider>
    </RouterProvider>
  )
}
