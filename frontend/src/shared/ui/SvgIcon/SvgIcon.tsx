import React from "react"

export type SvgIconProps = React.ComponentPropsWithoutRef<"svg">

export type Icon = (props: SvgIconProps) => React.ReactElement

export const SvgIcon = ({ children, ...props }: SvgIconProps) => {
	return <svg {...props}>{children}</svg>
}
