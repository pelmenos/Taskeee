import type { Ref } from "react"
import React from "react"

interface Props {
	ref: Ref<HTMLInputElement>
	value: string
	onChange?: (val: string) => void
	onBackspace?: () => void
	onPaste?: (text: string) => void
}

export const PinItem = ({ ref, value, onChange, onBackspace, onPaste }: Props) => {
	return (
		<label className="pin-input__item">
			<input
				ref={ref}
				type="text"
				className="pin-input__item__input"
				placeholder=""
				value={value}
				onKeyDown={(e) => e.key === "Backspace" && !value && onBackspace && onBackspace()}
				onChange={(e) => onChange && onChange(e.target.value)}
				onPaste={(e) => onPaste && onPaste(e.clipboardData.getData("text"))}
				autoComplete="off"
				maxLength={1}
			/>
		</label>
	)
}
