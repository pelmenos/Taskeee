import { Button } from "@mantine/core"
import { ComponentProps } from "react"

interface Props extends ComponentProps<typeof Button<"button">> {

}

export const FormSubmit = ({ children, ...props }: Props) => (
  <Button
    h="3rem"
    radius="lg"
    fz="xl"
    fw={600}
    ff="Montserrat, serif"
    bg="primary"
    c="on-primary"
    type="submit"
    fullWidth
    {...props}
  >
    {children}
  </Button>
)
