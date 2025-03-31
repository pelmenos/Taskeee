import "./CustomModal.scss"
import type {ComponentProps} from "react"
import {ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, ModalRoot, rem} from "@mantine/core";
import {clsx} from "clsx";
import {ChevronLeftIcon} from "../assets/icons/ChevronLeftIcon";


interface Props extends ComponentProps<typeof ModalRoot> {
  overlayProps?: ComponentProps<typeof ModalOverlay>
}

export const CustomModal = ({className, children, overlayProps, ...props}: Props) => {
  return (
    <ModalRoot
      centered
      size={rem(500)}
      className={clsx("custom-modal", className)}
      {...props}
    >
      <ModalOverlay
        backgroundOpacity={0.55}
        blur={3}
        {...overlayProps}
      />
      <ModalContent>
        <ModalHeader>
          <ModalCloseButton
            icon={
              <ChevronLeftIcon/>
            }
          >
            Назад
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          {children}
        </ModalBody>
      </ModalContent>
    </ModalRoot>
  )
}
