import React from "react"
import { clsx } from "clsx"

interface Props {
	className?: string
	children?: React.ReactNode
}

export const FallbackContainer = ({ className, children }: Props) => {
	return <div className={clsx("form__fallback-container", className)}>{children}</div>
}
