import { SvgIcon, SvgIconProps } from "../../SvgIcon"

export const SunIcon = (props: SvgIconProps) => (
  <SvgIcon
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M13 10a3 3 0 11-6 0 3 3 0 016 0z"
      stroke="#363853"
      strokeWidth={1.5}
    />
    <path
      d="M15.26 4.74l.097-.097M4.643 15.357l.097-.097M10 2.562V2.5m0 15v-.062M2.562 10H2.5m15 0h-.062M4.74 4.74l-.097-.097m10.714 10.714l-.097-.097"
      stroke="#363853"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SvgIcon>
)
