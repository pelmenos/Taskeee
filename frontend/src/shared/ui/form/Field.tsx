import React from "react"
import { clsx } from "clsx"
import type { Icon } from "../svg-icon"

interface Props {
	className?: string
	placeholder: string
	icon?: Icon
	inputProps?: React.ComponentPropsWithoutRef<"input">
}

export const Field = ({ className, placeholder, icon: Icon, inputProps }: Props) => {
	return (
		<label className={clsx("field", className)}>
			<input className="field__input" placeholder="" {...inputProps} />

			<span className="field__label">
				{Icon && <Icon className="field__label__icon" />}

				<span className="field__label__text">{placeholder}</span>
			</span>
		</label>
	)
}
