import React from "react"
import { useUnit } from "effector-react"
import { appTheme } from "shared/app"
import { Button } from "shared/ui/button"

export const HomePage = () => {
	const { theme, changed } = useUnit({
		theme: appTheme.$value,
		changed: appTheme.changed,
	})

	return (
		<div>
			<Button onClick={() => changed(theme === "dark" ? "light" : "dark")}>toggle ({theme})</Button>
		</div>
	)
}
