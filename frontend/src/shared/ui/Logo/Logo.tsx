import React, { ComponentProps } from "react"
import { HPACE } from "../assets/icons/HPACE"
import "./Logo.css"
import { routes } from "../../routing"
import { Link } from "atomic-router-react"
import { clsx } from "clsx"

interface Props extends Omit<ComponentProps<typeof Link>, "to" | "params"> {

}

export const Logo = ({ className, ...props }: Props) => {
  return (
    <Link
      className={clsx("logo", className)}
      to={routes.home}
      {...props}
    >
      <HPACE className="logo__icon" />

      <span className="logo__title">hpace crm</span>
    </Link>
  )
}
