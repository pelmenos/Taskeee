import { SvgIconProps, SvgIcon } from "../../SvgIcon"

export const GraphIcon = (props: SvgIconProps) => (
	<SvgIcon
		width={24}
		height={24}
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M8.982 6.303a.395.395 0 00-.096.013c-2.97.73-5.386 3.949-5.386 7.173 0 4.055 3.3 7.355 7.357 7.355 3.657 0 6.713-2.605 7.267-6.195.004-.03.018-.116-.064-.213a.44.44 0 00-.332-.146c-1.411 0-2.488.033-3.329.057-2.036.06-2.878.084-3.71-.534-1.254-.929-1.36-2.524-1.36-7.219a.256.256 0 00-.108-.21.386.386 0 00-.239-.08zm1.875 16.041C5.973 22.345 2 18.372 2 13.489c0-3.871 2.928-7.743 6.527-8.63a1.913 1.913 0 011.62.346c.433.34.682.847.682 1.39 0 4.385.148 5.565.753 6.014.397.293.941.29 2.774.24.852-.026 1.943-.058 3.372-.058.57 0 1.107.245 1.471.67.338.394.486.91.408 1.418-.668 4.325-4.348 7.466-8.75 7.466z"
			fill="currentColor"
		/>
		<mask
			id="a"
			style={{
				maskType: "luminance",
			}}
			maskUnits="userSpaceOnUse"
			x={12}
			y={1}
			width={11}
			height={11}
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M12.474 1.001h10.419v10.29h-10.42V1z"
				fill="#fff"
			/>
		</mask>
		<g mask="url(#a)">
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M14.01 2.503c-.11 2.519.053 5.773.13 7.062a.14.14 0 00.135.137c1.028.059 4.57.223 7.117-.152.006-1.404-.955-3.308-2.402-4.754-1.484-1.482-3.24-2.293-4.958-2.293h-.022zm3.304 8.788a56.02 56.02 0 01-3.126-.091 1.645 1.645 0 01-1.546-1.548c-.078-1.322-.247-4.681-.127-7.28a1.425 1.425 0 011.39-1.368c2.136-.062 4.341.93 6.145 2.73 1.758 1.758 2.874 4.067 2.842 5.884a1.44 1.44 0 01-1.223 1.406c-1.358.205-2.948.267-4.355.267z"
				fill="currentColor"
			/>
		</g>
	</SvgIcon>
)
