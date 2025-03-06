import React from "react"
import { HPACE } from "../Icons/HPACE"
import "./Logo.css"
import { routes } from "../../routing"
import { Link } from "atomic-router-react"

export const Logo = () => {
	return (
		<Link className="logo" to={routes.home}>
			<HPACE className="logo__icon" />

			<span className="logo__title">hpace crm</span>
		</Link>
	)
}
