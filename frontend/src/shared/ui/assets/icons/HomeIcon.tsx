import { SvgIcon, SvgIconProps } from "../../SvgIcon"

export const HomeIcon = (props: SvgIconProps) => (
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
        maskType: "luminance",
      }}
      maskUnits="userSpaceOnUse"
      x={2}
      y={1}
      width={21}
      height={22}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 1h20.5v21.505H2V1z"
        fill="#fff"
      />
    </mask>
    <g mask="url(#a)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.717 15.291a2.18 2.18 0 012.184 2.17v3.075c0 .257.206.463.47.47h1.906c1.502 0 2.723-1.207 2.723-2.689V9.593c-.007-.51-.25-.99-.667-1.309L13.74 3.026a2.416 2.416 0 00-3.011.002L4.181 8.282A1.675 1.675 0 003.5 9.61v8.707c0 1.482 1.221 2.688 2.723 2.688h1.924a.486.486 0 00.491-.479c0-.058.007-.116.019-.17V17.46c0-1.189.974-2.16 2.169-2.169h2.891zm4.56 7.214h-1.924c-1.102-.026-1.952-.89-1.952-1.969V17.46a.677.677 0 00-.684-.669h-2.886a.677.677 0 00-.674.67v3.065c0 .075-.01.147-.031.215a1.99 1.99 0 01-1.979 1.764H6.223C3.894 22.505 2 20.626 2 18.317V9.603A3.154 3.154 0 013.259 7.1l6.535-5.245a3.912 3.912 0 014.88-.002l6.582 5.25a3.158 3.158 0 011.244 2.48v8.734c0 2.31-1.894 4.188-4.223 4.188z"
        fill="currentColor"
      />
    </g>
  </SvgIcon>
)
