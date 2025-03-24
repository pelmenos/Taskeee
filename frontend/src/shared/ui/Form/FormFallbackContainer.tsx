import { clsx } from "clsx"
import { ComponentProps } from "react"

interface Props extends ComponentProps<"div"> {
}

export const FormFallbackContainer = ({ className, children, ...props }: Props) => {
  return (
    <div
      className={clsx("form__fallback-container", className)}
      {...props}
    >
      {children}
    </div>
  )
}
