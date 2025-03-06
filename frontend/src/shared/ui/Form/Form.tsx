import React from "react"
import "./Form.css"
import { clsx } from "clsx"

interface Props {
	className?: string
	children?: React.ReactNode
	onSubmit?: React.FormEventHandler<HTMLFormElement>
}

export const Form = ({ className, children, onSubmit }: Props) => {
	return (
		<form action="#" className={clsx("form", className)} onSubmit={onSubmit}>
			{children}
		</form>
	)
}
