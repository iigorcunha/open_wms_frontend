import { Grid, Image, Flex, Box, VStack } from '@chakra-ui/react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

export default function Login(): JSX.Element {
  return (
    <Grid templateAreas="'1fr 1fr'" h="100vh">
      <Box
        bgImage="url('/images/loginPhoto.jpg')"
        bgSize="cover"
        bgRepeat="no-repeat"
        bgPos="center"
      />
      <Flex
        w="100%"
        bg="main.darkBlue"
        flexDir="column"
        alignItems="center"
        justifyContent="center"
      >
        <Image src="/images/wmsLogo.svg" mb="16" />
        <VStack w="100%" spacing="8">
          <Input name="email" label="Email" isDark />
          <Input name="password" label="Senha" type="password" isDark />
        </VStack>
        <Button mt="16">ENTRAR</Button>
      </Flex>
    </Grid>
  );
}
