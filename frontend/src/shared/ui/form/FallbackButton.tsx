import React from "react"
import { clsx } from "clsx"

interface Props {
	className?: string
	children?: React.ReactNode
	onClick?: () => void
	disabled?: boolean
}

export const FallbackButton = ({ className, children, onClick, disabled }: Props) => {
	return (
		<button
			className={clsx("form__fallback-container__button", className)}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	)
}
