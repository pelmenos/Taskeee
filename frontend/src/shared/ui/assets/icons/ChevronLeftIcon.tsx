import { SvgIcon, SvgIconProps } from "../../SvgIcon"

// // TODO: change icon
// export const ChevronLeftIcon = ChevronRightIcon

export const ChevronLeftIcon = (props: SvgIconProps) => (
	<SvgIcon
		xmlns="http://www.w3.org/2000/svg"
		width={24}
		height={24}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth={2}
		strokeLinecap="round"
		strokeLinejoin="round"
		className="lucide lucide-chevron-left-icon lucide-chevron-left"
		{...props}
	>
		<path d="M15 18l-6-6 6-6" />
	</SvgIcon>
)
