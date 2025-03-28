import type { StoreWritable } from "effector"
import { createEvent, sample } from "effector"

type PersistOptions<T> = {
	key: string
	source: StoreWritable<T>
}

export const persist = <T>({ key, source }: PersistOptions<T>) => {
	const changed = createEvent<T>()

	sample({
		source: changed,
		target: source,
	})

	const pick = () => {
		const value = localStorage.getItem(key)

		changed(value !== null ? JSON.parse(value) : source.defaultState)
	}

	// Handle store updates.
	source.updates.watch((payload) => localStorage.setItem(key, JSON.stringify(payload)))

	// Handle when local storage update.
	window.addEventListener("storage", (e) => {
		if (e.key && e.key === key) {
			pick()
		}
	})

	pick()
}
