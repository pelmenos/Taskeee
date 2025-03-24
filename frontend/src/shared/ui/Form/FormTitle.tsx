import React, { ComponentProps } from "react"
import { clsx } from "clsx"

interface Props extends ComponentProps<"h1"> {
}

export const FormTitle = ({ className, children, ...props }: Props) => {
	return (
    <h1
      className={clsx("form__title", className)}
      {...props}
    >
      {children}
    </h1>)
}
