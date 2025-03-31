import { SvgIcon, SvgIconProps } from "../../SvgIcon"

export const SortIcon = (props: SvgIconProps) => (
	<SvgIcon width={24} height={24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
		<path
			d="M16 12H8M18 7H6M10 17h4"
			stroke="currentColor"
			strokeWidth={1.5}
			strokeLinecap="round"
		/>
	</SvgIcon>
)
