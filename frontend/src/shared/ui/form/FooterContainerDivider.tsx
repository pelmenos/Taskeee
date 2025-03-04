import React from "react"
import { clsx } from "clsx"

interface Props {
	className?: string
}

export const FooterContainerDivider = ({ className }: Props) => {
	return (
		<div className={clsx("form__divider-container", className)}>
			<hr className="form__divider-container__divider" />
			<span className="form__divider-container__text">или</span>
			<hr className="form__divider-container__divider" />
		</div>
	)
}
