import React from "react"
import { clsx } from "clsx"

interface Props {
	className?: string
	children?: React.ReactNode
}

export const FieldContainer = ({ className, children }: Props) => {
	return <div className={clsx("form__fields", className)}>{children}</div>
}
