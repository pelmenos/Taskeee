import { createEffect, createEvent, restore, sample } from "effector"
import { atom } from "../lib/factory.ts"
import { persist } from "../lib/local-storage.ts"
import { appStarted } from "./app-started.ts"

export type Theme = "dark" | "light"

const changeThemeFx = createEffect((theme: Theme) => {
	const rootClassList = document.documentElement.classList

	if (theme === "light") {
		rootClassList.remove("dark")

		return
	}

	rootClassList.add("dark")
})

export const appTheme = atom(() => {
	const changed = createEvent<Theme>()

	const $value = restore(
		changed,
		window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
	)

	persist({
		key: "theme",
		source: $value,
	})

	sample({
		clock: [$value.updates, appStarted],
		source: $value,
		target: changeThemeFx,
	})

	return {
		$value,

		changed,
	}
})
