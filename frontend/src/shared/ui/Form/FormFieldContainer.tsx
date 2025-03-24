import React, { ComponentProps } from "react"
import { clsx } from "clsx"

interface Props extends ComponentProps<"div"> {
  className?: string
  children?: React.ReactNode
}

export const FormFieldContainer = ({ className, children, ...props }: Props) => {
  return (
    <div
      className={clsx("form__fields", className)}
      {...props}
    >
      {children}
    </div>
  )
}
