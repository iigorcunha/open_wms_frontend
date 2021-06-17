import {
  Box,
  Stack,
  Text,
  Image,
  Flex,
  HStack,
  Button,
} from '@chakra-ui/react';
import Link from 'next/link';

export default function Home(): JSX.Element {
  return (
    <Box
      bg="main.darkBlue"
      w="100vw"
      h="100vh"
      bgImage="url('/images/personBackground.svg')"
      bgRepeat="no-repeat"
      bgPosition="right bottom"
      bgSize={1000}
    >
      <Flex px="100px" align="center" mb="80px">
        <Image mt="29px" src="/images/wmsLogo.svg" width="150px" />
        <HStack ml="118px" spacing="71px">
          <Link href="/">
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
              SERVIÇOS
            </Button>
          </Link>

          <Link href="/">
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
              SERVIÇOS
            </Button>
          </Link>

          <Link href="/">
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
              SERVIÇOS
            </Button>
          </Link>

          <HStack spacing="15px">
            <Link href="/login">
              <Button
                borderRadius="20px"
                color="main.darkBlue"
                bg="main.blue"
                fontSize="25px"
                fontWeight="bold"
                height="50px"
                px="60px"
                py="5px"
                _hover={{}}
                _active={{}}
              >
                Login
              </Button>
            </Link>

            <Link href="/signup">
              <Button
                borderRadius="20px"
                color="main.darkBlue"
                bg="main.green"
                fontSize="25px"
                fontWeight="bold"
                height="50px"
                _hover={{}}
                _active={{}}
              >
                CADASTRE-SE
              </Button>
            </Link>
          </HStack>
        </HStack>
      </Flex>
      <Stack
        spacing={4}
        color="main.white"
        ml="100px"
        maxW="500px"
        align="center"
      >
        <Text fontSize={40} fontWeight="bold">
          Título ou texto chamativo
        </Text>
        <Text fontSize={25} fontWeight="regular" maxW="430px">
          Paraágrafo que acompanha o título out texto chamativo. blablabla
          blablabla blablabla blablablabla bla blabla blablavbla blablabla
          blablabla blablabla blablablabla bla blabla blablavbla blablabla
          blablabla blablabla blablablabla bla blabla blablavbla
        </Text>
      </Stack>
    </Box>
  );
}
