import { clsx } from "clsx"
import { ComponentProps } from "react"

interface Props extends ComponentProps<"div"> {
}

export const FormFooterContainerDivider = ({ className, ...props }: Props) => {
  return (
    <div
      className={clsx("form__divider-container", className)}
      {...props}
    >
      <hr className="form__divider-container__divider" />
      <span className="form__divider-container__text">или</span>
      <hr className="form__divider-container__divider" />
    </div>
  )
}
