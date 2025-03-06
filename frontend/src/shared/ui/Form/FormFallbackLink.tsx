import { clsx } from "clsx"
import { Link } from "atomic-router-react"
import { RouteInstance } from "atomic-router"
import React from "react"

interface Props {
	className?: string
	to: RouteInstance<{}>
	children?: React.ReactNode
}

export const FormFallbackLink = ({ className, to, children }: Props) => {
	return (
		<Link to={to} className={clsx("form__fallback-container__link", className)}>
			{children}
		</Link>
	)
}
