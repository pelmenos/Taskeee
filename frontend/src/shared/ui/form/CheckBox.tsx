import React from "react"
import { Check } from "../icons/Check.tsx"
import { clsx } from "clsx"

interface Props {
	className?: string
	label?: string
	inputProps?: React.ComponentPropsWithoutRef<"input">
}

export const CheckBox = ({ className, label, inputProps }: Props) => {
	return (
		<label className={clsx("check-box", className)}>
			<span className="box">
				<input className="check-box__input" type="checkbox" {...inputProps} />

				<Check className="check-box__check-icon" />
			</span>

			<span className="check-box__label">{label}</span>
		</label>
	)
}
