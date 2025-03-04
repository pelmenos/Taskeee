import React from "react"
import { RouterProvider } from "atomic-router-react"
import { router, RoutesView } from "../lib"

export const App = () => {
	return (
		<RouterProvider router={router}>
			<RoutesView />
		</RouterProvider>
	)
}
