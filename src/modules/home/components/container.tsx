import { Container } from "./container.styles";

interface ContainerScreenProps {
  children: React.ReactNode;
}

const ContainerScreen = ({ children }: ContainerScreenProps) => {
  return (
    <Container>
      {children}
    </Container>
  )
}

export default ContainerScreen;