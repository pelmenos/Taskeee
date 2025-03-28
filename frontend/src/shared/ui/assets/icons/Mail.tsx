import React from "react"
import { SvgIcon, type SvgIconProps } from "shared/ui/SvgIcon"

export const Mail = (props: SvgIconProps) => (
	<SvgIcon
		width="20"
		height="20"
		viewBox="0 0 20 20"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path
			d="M1.25 6.25L10 10L18.75 6.25M5.25 17.5H14.75C16.1501 17.5 16.8502 17.5 17.385 17.2275C17.8554 16.9878 18.2378 16.6054 18.4775 16.135C18.75 15.6002 18.75 14.9001 18.75 13.5V6.5C18.75 5.09987 18.75 4.3998 18.4775 3.86502C18.2378 3.39462 17.8554 3.01217 17.385 2.77248C16.8502 2.5 16.1501 2.5 14.75 2.5H5.25C3.84987 2.5 3.1498 2.5 2.61502 2.77248C2.14462 3.01217 1.76217 3.39462 1.52248 3.86502C1.25 4.3998 1.25 5.09987 1.25 6.5V13.5C1.25 14.9001 1.25 15.6002 1.52248 16.135C1.76217 16.6054 2.14462 16.9878 2.61502 17.2275C3.1498 17.5 3.84987 17.5 5.25 17.5Z"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinejoin="round"
		/>
	</SvgIcon>
)
