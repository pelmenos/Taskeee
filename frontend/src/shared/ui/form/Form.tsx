import React from "react"
import "./Form.css"
import { Title } from "./Title"
import { FieldContainer } from "./FieldContainer"
import { Field } from "./Field"
import { clsx } from "clsx"
import { FooterContainer } from "./FooterContainer"
import { FooterContainerDivider } from "./FooterContainerDivider"
import { Socials } from "./Socials"
import { FallbackContainer } from "./FallbackContainer"
import { FallbackLink } from "./FallbackLink"
import { CheckBox } from "./CheckBox.tsx"
import { Text } from "./Text"
import { FallbackButton } from "./FallbackButton.tsx"

interface Props {
	className?: string
	children?: React.ReactNode
	onSubmit?: React.FormEventHandler<HTMLFormElement>
}

export const Form = ({ className, children, onSubmit }: Props) => {
	return (
		<form action="#" className={clsx("form", className)} onSubmit={onSubmit}>
			{children}
		</form>
	)
}

Form.Title = Title
Form.FallbackContainer = FallbackContainer
Form.FallbackLink = FallbackLink
Form.FallbackButton = FallbackButton
Form.FieldContainer = FieldContainer
Form.Field = Field
Form.FooterContainer = FooterContainer
Form.FooterContainerDivider = FooterContainerDivider
Form.Socials = Socials
Form.CheckBox = CheckBox
Form.Text = Text
