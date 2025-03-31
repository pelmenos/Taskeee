import React from "react"
import { SvgIcon, type SvgIconProps } from "shared/ui/SvgIcon"

export const Check = (props: SvgIconProps) => (
	<SvgIcon
		className="check-box__check-icon"
		width="14"
		height="14"
		viewBox="0 0 14 14"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path
			d="M11.5 3.625L5.3125 9.8125L2.5 7"
			stroke="#AF38FF"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</SvgIcon>
)
