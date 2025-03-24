import { clsx } from "clsx"
import { Link } from "atomic-router-react"
import React, { ComponentProps } from "react"

interface Props extends ComponentProps<typeof Link> {
}

export const FormFallbackLink = ({ className, to, children, ...props }: Props) => {
	return (
		<Link
      to={to}
      className={clsx("form__fallback-container__link", className)}
      {...props}
    >
			{children}
		</Link>
	)
}
