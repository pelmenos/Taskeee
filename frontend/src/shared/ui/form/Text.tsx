import React from "react"
import { clsx } from "clsx"

interface Props {
	className?: string
	children?: React.ReactNode
}

export const Text = ({ className, children }: Props) => {
	return <span className={clsx("form__text", className)}>{children}</span>
}
