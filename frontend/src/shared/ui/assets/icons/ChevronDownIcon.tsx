import { SvgIconProps, SvgIcon } from "../../SvgIcon"

export const ChevronDownIcon = (props: SvgIconProps) => (
	<SvgIcon
		width={20}
		height={20}
		viewBox="0 0 20 20"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path
			d="M6 8l4 4 4-4"
			stroke="currentColor"
			strokeWidth={1.5}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</SvgIcon>
)
