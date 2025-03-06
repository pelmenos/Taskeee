import React from "react"
import { clsx } from "clsx"

interface Props {
	className?: string
	children?: React.ReactNode
}

export const FormTitle = ({ className, children }: Props) => {
	return <h1 className={clsx("form__title", className)}>{children}</h1>
}
