import { Check } from "shared/ui/assets/icons/Check"
import { clsx } from "clsx"
import { ComponentProps } from "react"

interface Props extends ComponentProps<"label"> {
  label?: string
  inputProps?: ComponentProps<"input">
}

export const FormCheckBox = ({ className, label, inputProps, ...props }: Props) => {
  return (
    <label
      className={clsx("check-box", className)}
      {...props}
    >
			<span className="box">
				<input className="check-box__input" type="checkbox" {...inputProps} />

				<Check className="check-box__check-icon" />
			</span>

      <span className="check-box__label">{label}</span>
    </label>
  )
}
