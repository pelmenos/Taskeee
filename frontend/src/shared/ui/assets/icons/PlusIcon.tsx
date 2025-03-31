import { SvgIconProps, SvgIcon } from "../../SvgIcon"

export const PlusIcon = (props: SvgIconProps) => (
	<SvgIcon
		width={24}
		height={24}
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<mask
			id="a"
			style={{
				maskType: "alpha",
			}}
			maskUnits="userSpaceOnUse"
			x={0}
			y={0}
			width={24}
			height={24}
		>
			<path fill="currentColor" d="M0 0H24V24H0z" />
		</mask>
		<g mask="url(#a)">
			<path d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2v-6z" fill="#fff" />
		</g>
	</SvgIcon>
)
