import { Box, useRadio } from '@chakra-ui/react';

interface RadioCardProps {
  name: string;
  color: string;
  bg: string;
}

export function RadioCard({ name, color, bg }: RadioCardProps): JSX.Element {
  const { getInputProps, getCheckboxProps } = useRadio();

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        fontWeight="bold"
        color="main.darkBlue"
        bg="main.white"
        _focus={{
          boxShadow: 'outline',
          bg: `${bg}`,
          color: `${color}`,
          borderColor: `${bg}`,
        }}
        align="center"
        w="36"
        mt="4"
        // px={5}
        // py={3}
        p="4"
      >
        {name}
      </Box>
    </Box>
  );
}
