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
      alignItems="center"
      isInvalid={!!error}
      maxW="450px"
    >
      <InputGroup flexDir="column">
        <Text
          ml="4"
          fontWeight="600"
          fontSize="lg"
          letterSpacing="1px"
          color="main.white"
        >
          {label}
        </Text>
        <ChakraInput
          h="60px"
          aria-label={name}
          name={name}
          fontSize="xl"
          ref={ref}
          borderColor="transparent"
          bgColor={isDark ? 'main.darkBlue' : 'main.offWhite'}
          _placeholder={{
            color: isDark ? 'main.white' : 'main.darkBlue',
          }}
          _hover={{
            borderColor: isDark ? 'main.offWhite' : 'main.green',
          }}
          borderRadius="20px"
          py={6}
          pr={8}
          {...rest}
        />
      </InputGroup>

      {!!error && (
        <Tooltip label={error.message} bg="red.500">
          <FormErrorMessage ml={-6} mt={0} zIndex="tooltip">
            <Icon as={FiAlertCircle} color="red.500" w={4} h={4} />
          </FormErrorMessage>
        </Tooltip>
      )}
    </FormControl>
  );
};

export const Input = forwardRef(InputBase);
