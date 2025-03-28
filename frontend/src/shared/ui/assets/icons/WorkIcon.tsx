import { SvgIcon, SvgIconProps } from "shared/ui/SvgIcon"

export const WorkIcon = (props: SvgIconProps) => (
  <SvgIcon
    width={18}
    height={18}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.996 13.07a.563.563 0 01-.562-.563v-1.902a.563.563 0 011.125 0v1.902c0 .31-.252.563-.563.563z"
      fill="#8D8E99"
    />
    <mask
      id="a"
      style={{
        maskType: "luminance",
      }}
      maskUnits="userSpaceOnUse"
      x={1}
      y={3}
      width={16}
      height={9}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.5 3.435h14.992v7.733H1.5V3.435z"
        fill="#fff"
      />
    </mask>
    <g mask="url(#a)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.625 8.544c1.782.969 4.029 1.499 6.367 1.499 2.343 0 4.593-.53 6.375-1.499V6.293a1.73 1.73 0 00-1.725-1.733H4.358a1.73 1.73 0 00-1.733 1.725v2.26zm6.367 2.624c-2.658 0-5.221-.644-7.214-1.81a.56.56 0 01-.278-.486V6.285a2.857 2.857 0 012.857-2.85h9.285a2.857 2.857 0 012.85 2.858v2.58c0 .2-.106.384-.278.484-1.992 1.167-4.557 1.81-7.221 1.81z"
        fill="#8D8E99"
      />
    </g>
    <mask
      id="b"
      style={{
        maskType: "luminance",
      }}
      maskUnits="userSpaceOnUse"
      x={5}
      y={1}
      width={8}
      height={4}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.809 1.5h6.375v3.057H5.809V1.5z"
        fill="#fff"
      />
    </mask>
    <g mask="url(#b)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.621 4.557a.563.563 0 01-.562-.563V3.72c0-.604-.492-1.095-1.095-1.095H8.029c-.604 0-1.095.491-1.095 1.095v.274a.563.563 0 01-1.125 0V3.72c0-1.224.996-2.22 2.22-2.22h1.935c1.224 0 2.22.996 2.22 2.22v.274c0 .311-.252.563-.563.563z"
        fill="#8D8E99"
      />
    </g>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.346 16.305h-8.7a3.006 3.006 0 01-2.984-2.768l-.143-1.882a.563.563 0 01.52-.604.57.57 0 01.603.52l.142 1.88a1.877 1.877 0 001.862 1.729h8.7c.971 0 1.79-.76 1.862-1.729l.143-1.88c.024-.311.299-.532.603-.52.31.024.542.294.519.604l-.143 1.882a3.006 3.006 0 01-2.984 2.768z"
      fill="#8D8E99"
    />
  </SvgIcon>
)
