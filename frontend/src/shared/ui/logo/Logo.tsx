import React from "react"
import { HPACE } from "../icons/HPACE.tsx"
import "./Logo.css"

export const Logo = () => {
	return (
		<a className="logo" href="#">
			<HPACE className="logo__icon" />

			<span className="logo__title">hpace crm</span>
		</a>
	)
}
