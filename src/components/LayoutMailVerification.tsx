import { Flex, VStack, Image } from '@chakra-ui/react';

interface LayoutMailVerificationProps {
  children: React.ReactElement | React.ReactElement[];
}

export function LayoutMailVerification({
  children,
}: LayoutMailVerificationProps): JSX.Element {
  return (
    <Flex
      bg="main.darkBlue"
      h="100vh"
      align="center"
      justify="center"
      flexDir="column"
    >
      <Image src="/images/logoHorizontal.svg" mb={['8', '8', '8', '16']} />
      <VStack
        bg="white"
        w="90%"
        maxH="600px"
        maxW="600px"
        h="100%"
        m="8"
        p={['4', '4', '4', '8']}
        borderRadius="20px"
        spacing="16"
        align="center"
        justify="center"
      >
        {children}
      </VStack>
    </Flex>
  );
}
