import { clsx } from "clsx"
import { ComponentProps } from "react"

interface Props extends ComponentProps<"button"> {
}

export const FormFallbackButton = ({ className, children, ...props }: Props) => {
	return (
		<button
			className={clsx("form__fallback-container__button", className)}
      {...props}
		>
			{children}
		</button>
	)
}
