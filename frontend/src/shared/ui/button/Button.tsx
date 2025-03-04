import React from "react"
import { clsx } from "clsx"
import "./Button.css"

type Props = React.ComponentPropsWithoutRef<"button">

export const Button = ({ className, children, ...props }: Props) => {
	return (
		<button className={clsx("button", className)} {...props}>
			{children}
		</button>
	)
}
