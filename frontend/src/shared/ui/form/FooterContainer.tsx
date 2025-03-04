import React from "react"
import { clsx } from "clsx"

interface Props {
	className?: string
	children?: React.ReactNode
}

export const FooterContainer = ({ className, children }: Props) => {
	return <div className={clsx("form__footer-container", className)}>{children}</div>
}
