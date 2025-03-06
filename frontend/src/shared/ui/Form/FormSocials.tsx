import React from "react"
import { clsx } from "clsx"
import { VK } from "../Icons/VK"
import { Yandex } from "../Icons/Yandex"
import { Telegram } from "../Icons/Telegram"
import { Button } from "../Button"

interface Props {
	className?: string
}

export const FormSocials = ({ className }: Props) => {
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
