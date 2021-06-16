import { Button as ChakraButton } from '@chakra-ui/react';

interface ButtonProps {
  children: React.ReactNode;
}

export function Button({ children }: ButtonProps): JSX.Element {
  return <ChakraButton>{children}</ChakraButton>;
}
