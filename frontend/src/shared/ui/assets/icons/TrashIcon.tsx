import { SvgIcon, SvgIconProps } from "../../SvgIcon"

export const TrashIcon = (props: SvgIconProps) => (
	<SvgIcon
		width={24}
		height={24}
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M14.75 22.75h-6a4 4 0 01-4-4v-13h14v13a4 4 0 01-4 4z" fill="#DADADA" opacity={0.4} />
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M13.75 10a.75.75 0 01.75.75v6a.75.75 0 01-1.5 0v-6a.75.75 0 01.75-.75zM9.75 10a.75.75 0 01.75.75v6a.75.75 0 01-1.5 0v-6a.75.75 0 01.75-.75zM8.532 3.225A2.75 2.75 0 0110.82 2h1.86c.92 0 1.778.46 2.288 1.225L16.15 5h4.599a.75.75 0 010 1.5h-18a.75.75 0 010-1.5h4.599l1.183-1.775z"
			fill="#DADADA"
		/>
	</SvgIcon>
)
