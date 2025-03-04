import { SvgIcon, type SvgIconProps } from "../svg-icon"

export const HPACE = (props: SvgIconProps) => (
	<SvgIcon
		width="32"
		height="32"
		viewBox="0 0 32 32"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path
			d="M2.34315 2.34315C0 4.68629 0 8.45753 0 16C0 23.5425 0 27.3137 2.34315 29.6569C4.68629 32 8.45753 32 16 32C23.5425 32 27.3137 32 29.6569 29.6569C32 27.3137 32 23.5425 32 16C32 8.45753 32 4.68629 29.6569 2.34315C27.3137 0 23.5425 0 16 0C8.45753 0 4.68629 0 2.34315 2.34315ZM14.1972 19.3677C14.6625 18.8345 15.2923 18.4267 16 18.4267C16.7077 18.4267 17.3375 18.8345 17.8028 19.3677C18.781 20.4888 20.2387 21.2 21.8666 21.2C24.8122 21.2 27.2 18.8719 27.2 16C27.2 13.1281 24.8122 10.8 21.8666 10.8C20.2387 10.8 18.781 11.5112 17.8028 12.6323C17.3375 13.1655 16.7077 13.5733 16 13.5733C15.2923 13.5733 14.6625 13.1655 14.1972 12.6323C13.2189 11.5112 11.7613 10.8 10.1333 10.8C7.18782 10.8 4.8 13.1281 4.8 16C4.8 18.8719 7.18782 21.2 10.1333 21.2C11.7613 21.2 13.2189 20.4888 14.1972 19.3677Z"
			fillRule="evenodd"
			clipRule="evenodd"
		/>
		<defs>
			<radialGradient
				id="logo-dark-gradient"
				cx="0"
				cy="0"
				r="1"
				gradientUnits="userSpaceOnUse"
				gradientTransform="translate(20) rotate(90) scale(40)"
			>
				<stop stopColor="#5F009F" />
				<stop offset="1" stopColor="#AF38FF" />
			</radialGradient>

			<radialGradient
				id="logo-light-gradient"
				cx="0"
				cy="0"
				r="1"
				gradientUnits="userSpaceOnUse"
				gradientTransform="translate(20) rotate(90) scale(40)"
			>
				<stop stopColor="#5F6FFF" />
				<stop offset="1" stopColor="#2339FF" />
			</radialGradient>
		</defs>
	</SvgIcon>
)
