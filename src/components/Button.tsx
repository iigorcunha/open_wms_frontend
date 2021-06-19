import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
  CircularProgress,
} from '@chakra-ui/react';

interface ButtonProps extends ChakraButtonProps {
  children: React.ReactNode;
  isSubmitting?: boolean;
}

export function Button({
  isSubmitting = false,
  children,
  ...rest
}: ButtonProps): JSX.Element {
  return isSubmitting ? (
    <ChakraButton
      maxW="450px"
      w="100%"
      borderRadius="20px"
      h="60px"
      colorScheme="greenBtn"
      color="main.darkBlue"
      {...rest}
    >
      <CircularProgress />
    </ChakraButton>
  ) : (
    <ChakraButton
      maxW="450px"
      w="100%"
      borderRadius="20px"
      h="60px"
      colorScheme="greenBtn"
      color="main.darkBlue"
      {...rest}
    >
      {children}
    </ChakraButton>
  );
}
