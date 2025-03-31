import { SvgIcon, SvgIconProps } from "../../SvgIcon"

export const StackIcon = (props: SvgIconProps) => (
  <SvgIcon
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M17.5 15l-6.823 3.032c-.431.192-.923.192-1.354 0L2.5 15m15-4.167l-6.823 3.033c-.431.191-.923.191-1.354 0L2.5 10.833m.657-4.254l6.098 3.048c.469.235 1.021.235 1.49 0l6.098-3.048a.833.833 0 000-1.491l-6.098-3.049a1.667 1.667 0 00-1.49 0L3.157 5.088a.833.833 0 000 1.49z"
      stroke="#fff"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SvgIcon>
)
