import { ComponentProps } from "react"
import { clsx } from "clsx"
import { MoonIcon } from "../assets/icons/MoonIcon"
import { SunIcon } from "../assets/icons/SunIcon"

interface ThemeToggleProps extends ComponentProps<"button"> {

}

export const ThemeToggle = ({ className, ...props }: ThemeToggleProps) => {
  return (
    <button
      className={clsx("header-desktop__theme-toggle", className)}
      {...props}
    >
        <span className="header-desktop__theme-toggle__dark">

          <MoonIcon className="header-desktop__theme-toggle__dark__icon" />

        </span>

      <span className="header-desktop__theme-toggle__light">

        <SunIcon className="header-desktop__theme-toggle__light__icon"/>

        </span>
    </button>
  )
}
