import { Grid, Image, Flex, Box, VStack, useToast } from '@chakra-ui/react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { AuthContext } from '../contexts/AuthContext';

interface SignInFormData {
  login: string;
  password: string;
}

export default function Login(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const toast = useToast();

  const { signIn } = useContext(AuthContext);

  const authenticate = useMutation(
    async ({ login, password }: SignInFormData): Promise<void> => {
      await signIn({ login, password });
    }
  );

  const onSubmit = async ({
    login,
    password,
  }: SignInFormData): Promise<void> => {
    try {
      await authenticate.mutateAsync({ login, password });
    } catch (err) {
      toast({
        duration: 3000,
        status: 'error',
        title: 'Algo deu errado',
        description: 'Usuário/senha incorretos!',
        position: 'top-right',
      });
    }
  };
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
        as="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Image src="/images/wmsLogo.svg" mb="16" />
        <VStack w="100%" spacing="8">
          <Input name="login" label="Login" isDark {...register('login')} />
          <Input
            name="password"
            label="Senha"
            type="password"
            isDark
            {...register('password')}
          />
        </VStack>
        <Button type="submit" mt="16">
          ENTRAR
        </Button>
      </Flex>
    </Grid>
  );
}
