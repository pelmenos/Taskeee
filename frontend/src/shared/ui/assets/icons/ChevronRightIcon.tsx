import { SvgIcon, SvgIconProps } from "../../SvgIcon"

export const ChevronRightIcon = (props: SvgIconProps) => (
  <SvgIcon
    className="sidebar__footer__nav__item__chevron"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M10 16l4-4.034-4-4.034"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SvgIcon>
)
