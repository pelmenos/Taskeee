import React, { ComponentProps } from "react"
import { HPACE } from "../assets/icons/HPACE"
import "./Logo.scss"
import { routes } from "../../routing"
import { Link } from "atomic-router-react"
import { Flex, Text } from "@mantine/core"

interface Props extends Omit<ComponentProps<typeof Link>, "to" | "params"> {
  onlyIcon?: boolean,
}

export const Logo = ({ className, onlyIcon, ...props }: Props) => {
  return (
    <Link
      style={{
        textDecoration: "none",
      }}
      to={routes.home}
      {...props}
    >
      <Flex
        direction="row"
        align="center"
        justify="flex-start"
        flex={0}
        gap={{
          base: "xs",
          "512px": "sm",
        }}
      >
        <HPACE
          w="2rem"
          h="2rem"
          className="logo__icon" />

        {!onlyIcon && (
          <Text
            span
            w="3rem"
            lh={1}
            ff="Manrope, serif"
            td="none"
            fw={800}
            c="var(--logo-color)"
          >
            hpace crm
          </Text>
        )}
      </Flex>
    </Link>
  )
}
