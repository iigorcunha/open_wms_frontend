import { Grid, Box, Flex, Image } from '@chakra-ui/react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export default function SignUp(): JSX.Element {
  return (
    <Grid templateAreas="'1fr 1fr'" h="100vh">
      <Flex
        w="100%"
        bg="main.darkBlue"
        flexDir="column"
        alignItems="center"
        justifyContent="center"
      >
        <Image src="/images/wmsLogo.svg" mb="16" />
        <Input name="name" label="Nome Completo" mb="6" />
        <Input name="email" label="Email" mb="6" />
        <Input name="password" label="Senha" type="password" mb="6" />
        <Input
          name="password_confirmation"
          label="Confirmação de Senha"
          type="password"
        />
        <Button mt="16">CADASTRAR</Button>
      </Flex>
      <Box
        bgImage="url('/images/signUpPhoto.jpg')"
        bgSize="cover"
        bgRepeat="no-repeat"
        bgPos="center"
      />
    </Grid>
  );
}
