import { SvgIcon, SvgIconProps } from "../../SvgIcon"

export const TwoUsersIcon = (props: SvgIconProps) => (
  <SvgIcon
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M3 18.433a4.074 4.074 0 013.432-4.023l.178-.029a15.163 15.163 0 014.78 0l.178.029A4.074 4.074 0 0115 18.433c0 .865-.702 1.567-1.567 1.567H4.567A1.567 1.567 0 013 18.433zM12.5 7.5a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0z"
      stroke="#46474E"
      strokeWidth={1.5}
    />
    <path
      d="M15 11a3.5 3.5 0 100-7m2.39 16h2.043c.865 0 1.567-.702 1.567-1.567a4.074 4.074 0 00-3.432-4.023v0a2.28 2.28 0 00-.359-.029h-.968"
      stroke="#46474E"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
  </SvgIcon>
)
