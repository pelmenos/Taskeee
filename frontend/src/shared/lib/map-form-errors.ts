export const mapErrors = <T extends Record<string, string[] | undefined>>(
	errors: T,
): { [K in keyof T]: string | null } => {
	const result: Record<string, string | null> = {}

	for (const key in errors) {
		const value = errors[key]

		if (value === undefined) {
			result[key] = null
		} else if (Array.isArray(value) && value.length > 0) {
			result[key] = value[0]
		} else {
			result[key] = null
		}
	}

	return result as { [K in keyof T]: string | null }
}
