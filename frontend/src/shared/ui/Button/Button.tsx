import { clsx } from "clsx"
import "./Button.css"
import { ComponentProps } from "react"

interface Props extends ComponentProps<"button"> {}

export const Button = ({ className, children, ...props }: Props) => {
  return (
    <button className={clsx("button", className)} {...props}>
      {children}
    </button>
  )
}
