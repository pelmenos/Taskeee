import React, { useCallback, useEffect, useRef, useState } from "react"
import { clsx } from "clsx"
import { PinItem } from "./PinItem"
import "./PinInput.css"

interface Props {
	className?: string
	length: number
	onChange: (val: number) => void
}

export const PinInput = ({ className, length, onChange }: Props) => {
	const [values, setValues] = useState<string[]>(Array(length).fill(""))

	useEffect(() => {
		onChange(Number(values.join("")))
	}, [values, onChange])

	const items = useRef<Array<HTMLInputElement | null>>([])

	const onItemChange = (val: string, index: number) => {
    if (!val.match(/^[0-9]*$/)) {
      return
    }

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

      if (!text.match(/^[0-9]*$/)) {
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
