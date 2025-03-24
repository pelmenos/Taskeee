import React, { ComponentProps } from "react"
import { clsx } from "clsx"
import { VK } from "shared/ui/assets/icons/VK"
import { Yandex } from "shared/ui/assets/icons/Yandex"
import { Telegram } from "shared/ui/assets/icons/Telegram"
import { Button } from "../Button"

interface Props extends ComponentProps<"div"> {
}

export const FormSocials = ({ className, ...props }: Props) => {
	return (
		<div
      className={clsx("form__socials", className)}
      {...props}
    >
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
