import type { SVGProps } from "react"

type MoonwitnessMarkProps = SVGProps<SVGSVGElement> & {
  size?: number
}

export function MoonwitnessMark({ size = 64, ...props }: MoonwitnessMarkProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="28" cy="32" r="19" fill="#FFD400" />
      <circle cx="38" cy="25" r="18" fill="#07060B" />
      <path
        d="M49 42L51 46L55 48L51 50L49 54L47 50L43 48L47 46L49 42Z"
        fill="#F7F4EC"
      />
    </svg>
  )
}
