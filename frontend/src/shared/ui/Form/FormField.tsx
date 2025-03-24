import React, { ComponentProps } from "react"
import { clsx } from "clsx"
import type { Icon } from "shared/ui/SvgIcon"


interface Props extends ComponentProps<"label"> {
  placeholder: string
  icon?: Icon
  inputProps?: React.ComponentProps<"input">
}

export const FormField = ({ className, placeholder, icon: Icon, inputProps, ...props }: Props) => {
  return (
    <label
      className={clsx("field", className)}
      {...props}
    >
      <input className="field__input" placeholder="" {...inputProps} />

      <span className="field__label">
				{Icon && <Icon className="field__label__icon" />}

        <span className="field__label__text">{placeholder}</span>
			</span>
    </label>
  )
}
