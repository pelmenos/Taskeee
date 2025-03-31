import { SvgIcon, SvgIconProps } from "../../SvgIcon"

export const BurgerIcon = (props: SvgIconProps) => (
  <SvgIcon
    width={38}
    height={24}
    viewBox="0 0 38 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M2 22h24M2 12h29M2 2h34"
      stroke="#1E1F2E"
      strokeWidth={3}
      strokeLinecap="round"
    />
  </SvgIcon>
)
