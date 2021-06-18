import { forwardRef, ForwardRefRenderFunction } from 'react';
import { FieldError } from 'react-hook-form';
import {
  FormControl,
  FormErrorMessage,
  Text,
  Icon,
  InputGroup,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  Tooltip,
  InputRightElement,
} from '@chakra-ui/react';
import { FiAlertCircle } from 'react-icons/fi';

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?: FieldError;
  isDark?: boolean;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, isDark = false, label, error = null, ...rest },
  ref
) => {
  return (
    <FormControl
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      justifyContent="center"
      isInvalid={!!error}
      maxW="450px"
      mb="6"
    >
      <Text
        ml="4"
        fontWeight="600"
        fontSize="m"
        letterSpacing="1px"
        color="main.white"
      >
        {label}
      </Text>
      <InputGroup
        display="flex"
        flexDir="row"
        alignItems="center"
        justifyContent="center"
      >
        <ChakraInput
          h="60px"
          aria-label={name}
          name={name}
          fontSize="xl"
          ref={ref}
          borderColor="transparent"
          bgColor="main.offWhite"
          _active={{
            backgroundColor: '#ff3535',
          }}
          _hover={{
            borderColor: isDark ? 'main.offWhite' : 'main.green',
          }}
          borderRadius="20px"
          py={6}
          pr={8}
          {...rest}
        />

        {!!error && (
          <InputRightElement width="4.5rem" h="100%">
            <Tooltip label={error.message} bg="red.500">
              <FormErrorMessage>
                <Icon as={FiAlertCircle} color="red.500" w={5} h={5} />
              </FormErrorMessage>
            </Tooltip>
          </InputRightElement>
        )}
      </InputGroup>
    </FormControl>
  );
};

export const Input = forwardRef(InputBase);
