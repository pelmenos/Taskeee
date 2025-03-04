import React from "react"
import { clsx } from "clsx"
import { VK } from "../icons/VK.tsx"
import { Yandex } from "../icons/Yandex.tsx"
import { Telegram } from "../icons/Telegram.tsx"
import { Button } from "../button"

interface Props {
	className?: string
}

export const Socials = ({ className }: Props) => {
	return (
		<div className={clsx("form__socials", className)}>
			<Button className="social social-vk">
				<VK />
			</Button>

			<Button className="social social-ya">
				<Yandex />
			</Button>

			<Button className="social social-tg">
				<Telegram />
			</Button>
		</div>
	)
}
