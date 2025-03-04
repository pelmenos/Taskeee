import React from "react"
import "./FormLayout.css"
import { clsx } from "clsx"
import { Logo } from "shared/ui/logo"

interface Props {
	className?: string
	children?: React.ReactNode
}

export const FormLayout = ({ className, children }: Props) => {
	return (
		<div className={clsx("form-layout", className)}>
			<header className="header">
				<Logo />
			</header>

			<main className="main">
				<div className="form-container">
					{children}

					<p className="disclaimer">
						Используя HPACE.CRM, Вы подтвреждение, что прочитали и поняли, а также соглашаетесь с
						правилами и условиями и Политикой конфиденциальности.
					</p>
				</div>
			</main>
		</div>
	)
}
