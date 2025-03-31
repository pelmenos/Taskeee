import "./CustomModal.scss"
import {
  ModalOverlayProps,
  ModalRootProps,

  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalRoot,
  rem} from "@mantine/core"

import { clsx } from "clsx"
import { ChevronLeftIcon } from "../assets/icons/ChevronLeftIcon"


interface Props extends ModalRootProps {
  overlayProps?: ModalOverlayProps
}

export const CustomModal = ({ className, children, overlayProps, ...props }: Props) => {
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
              <ChevronLeftIcon />
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
