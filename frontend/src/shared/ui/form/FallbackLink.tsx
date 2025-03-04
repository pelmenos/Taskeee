import React from "react"
import { clsx } from "clsx"

interface Props {
	className?: string
	href: string
	children?: React.ReactNode
}

export const FallbackLink = ({ className, href, children }: Props) => {
	return (
		<a href={href} className={clsx("form__fallback-container__link", className)}>
			{children}
		</a>
	)
}
