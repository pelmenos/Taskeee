import { SvgIconProps , SvgIcon } from "../../SvgIcon";


export const ProfileIcon = (props: SvgIconProps) => (
  <SvgIcon
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M9.87 18.051c-3.076 0-5.703-.479-5.703-2.396 0-1.917 2.61-3.687 5.704-3.687 3.076 0 5.703 1.753 5.703 3.67 0 1.916-2.61 2.413-5.703 2.413zM9.865 9.311a3.655 3.655 0 10-3.656-3.655 3.642 3.642 0 003.63 3.655h.026z"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SvgIcon>
)
