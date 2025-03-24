import React, { ComponentProps } from "react"
import "./Form.css"
import { clsx } from "clsx"

interface Props extends ComponentProps<"form"> {
}

export const Form = ({ className, children, ...props }: Props) => {
  return (
    <form
      className={clsx("form", className)}
      {...props}
    >
      {children}
    </form>
  )
}
