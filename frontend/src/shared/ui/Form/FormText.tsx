import React, { ComponentProps } from "react"
import { clsx } from "clsx"

interface Props extends ComponentProps<"span"> {
}

export const FormText = ({ className, children, ...props }: Props) => {
  return (
    <span
      className={clsx("form__text", className)}
      {...props}>
    {children}
  </span>
  )
}
