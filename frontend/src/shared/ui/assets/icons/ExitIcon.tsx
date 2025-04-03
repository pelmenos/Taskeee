import { SvgIconProps, SvgIcon } from "../../SvgIcon"

export const ExitIcon = (props: SvgIconProps) => (
	<SvgIcon
		width={18}
		height={18}
		viewBox="0 0 18 18"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path
			d="M13.5 10.5l.793-.793a1 1 0 000-1.414L13.5 7.5"
			stroke="currentColor"
			strokeWidth={1.5}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M14.25 9h-4.5M3 12.95v-7.5m9 7.5a1.5 1.5 0 01-1.5 1.5h-3m4.5-9a1.5 1.5 0 00-1.5-1.5h-3M3.668 14.895l1.5 1c.997.665 2.332-.05 2.332-1.248V3.753c0-1.199-1.335-1.913-2.332-1.249l-1.5 1A1.5 1.5 0 003 4.753v8.894c0 .502.25.97.668 1.248z"
			stroke="currentColor"
			strokeWidth={1.5}
			strokeLinecap="round"
		/>
	</SvgIcon>
)
