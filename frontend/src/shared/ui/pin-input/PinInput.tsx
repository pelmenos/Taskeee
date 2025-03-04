import React, { useCallback, useEffect, useRef, useState } from "react"
import { clsx } from "clsx"
import { PinItem } from "./PinItem.tsx"
import "./PinInput.css"

interface Props {
	className?: string
	length: number
	onChange: (val: string) => void
}

export const PinInput = ({ className, length, onChange }: Props) => {
	const [values, setValues] = useState<string[]>(Array(length).fill(""))

	useEffect(() => {
		onChange(values.join(""))
	}, [values, onChange])

	const items = useRef<Array<HTMLInputElement | null>>([])

	const onItemChange = (val: string, index: number) => {
		setValues((prev) => {
			prev[index] = val
			return [...prev]
		})

		// Set focus on next
		if (val.length === 1 && index < length - 1) {
			items.current[index + 1]?.focus()
		}
	}

	const onPaste = useCallback(
		(text: string) => {
			if (text.length !== length) {
				return
			}

			setValues(text.split(""))
		},
		[length, setValues],
	)

	return (
		<div className={clsx("pin-input", className)}>
			{values.map((val, i) => (
				<PinItem
					ref={(el) => {
						items.current[i] = el
					}}
					key={i}
					value={val}
					onChange={(val) => onItemChange(val, i)}
					onBackspace={() => i > 0 && items.current[i - 1]?.focus()}
					onPaste={onPaste}
				/>
			))}
		</div>
	)
}
