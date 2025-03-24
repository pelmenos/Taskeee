import React, { ComponentProps } from "react"
import { clsx } from "clsx"

interface Props extends ComponentProps<"div"> {
	className?: string
	children?: React.ReactNode
}

export const FormFooterContainer = ({ className, children, ...props }: Props) => {
	return (
    <div
      className={clsx("form__footer-container", className)}
      {...props}
    >
      {children}
    </div>
  )
}
