import {
  Box,
  Stack,
  Text,
  Image,
  Flex,
  HStack,
  Button,
  Link as ChakraLink,
} from '@chakra-ui/react';
import Link from 'next/link';

export default function Home(): JSX.Element {
  return (
    <Box
      bg="main.darkBlue"
      w="100%"
      h="100vh"
      bgImage="url('/images/personBackground.svg')"
      bgRepeat="no-repeat"
      bgPosition="right bottom"
      display="flex"
      justifyContent="center"
      alignItems="flex-start"
    >
      <Flex
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="center"
        w="100%"
        maxW={1480}
      >
        <Flex align="center" justifyContent="space-between" mt="8" w="100%">
          <Image src="/images/logoHorizontal.svg" />
          <HStack spacing="10">
            <ChakraLink as={Link} href="/">
              <Button
                bg="transparent"
                color="main.white"
                fontWeight="bold"
                fontSize="25px"
                _hover={{
                  color: 'main.yellow',
                }}
                _active={{}}
              >
                HOME
              </Button>
            </ChakraLink>

            <Link href="/" passHref>
              <ChakraLink
                color="main.white"
                fontWeight="bold"
                fontSize="2xl"
                _hover={{
                  color: 'main.yellow',
                }}
              >
                RECURSOS
              </ChakraLink>
            </Link>

            <Link href="/" passHref>
              <ChakraLink
                bg="transparent"
                color="main.white"
                fontWeight="bold"
                fontSize="25px"
                _hover={{
                  color: 'main.yellow',
                }}
                _active={{}}
              >
                SERVIÇOS
              </ChakraLink>
            </Link>

            <HStack spacing="8">
              <Link href="/login" passHref>
                <ChakraLink
                  borderRadius="20px"
                  color="main.darkBlue"
                  bg="main.blue"
                  fontSize="2xl"
                  fontWeight="bold"
                  py={2}
                  px={8}
                >
                  Login
                </ChakraLink>
              </Link>

              <Link href="/signup" passHref>
                <ChakraLink
                  borderRadius="20px"
                  color="main.darkBlue"
                  bg="main.green"
                  fontSize="2xl"
                  fontWeight="bold"
                  height="50px"
                  py={2}
                  px={8}
                >
                  Cadastre-se
                </ChakraLink>
              </Link>
            </HStack>
          </HStack>
        </Flex>
        <Stack
          spacing={4}
          color="main.offWhite"
          mt="16"
          maxW={500}
          align="center"
        >
          <Text fontSize="5xl" fontWeight="bold">
            Um novo{' '}
            <Text as="span" color="main.blue">
              W
            </Text>
            <Text as="span" color="main.yellow">
              M
            </Text>
            <Text as="span" color="main.green">
              S
            </Text>{' '}
            para simplificar a sua gestão.
          </Text>
          <Text fontSize="2xl" fontWeight="regular" textAlign="justify">
            O <strong>openWMS</strong> foi criado pensando em facilitar a vida
            das pessoas e dos micro e pequenos empresários, tornando a gestão
            mais simples e mais acessível para todo e qualquer item que você
            tenha comprado.{' '}
            <Link href="/signUp" passHref>
              <ChakraLink fontWeight="600" color="main.green">
                clique aqui
              </ChakraLink>
            </Link>{' '}
            e faça seu cadastro agora e faça parte dessa revolução.
          </Text>
        </Stack>
      </Flex>
    </Box>
  );
}
