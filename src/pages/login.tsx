import { Grid, Image, Flex, Box, VStack, useToast } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import * as yup from 'yup';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { useAuth } from '../hooks/useAuth';

interface SignInFormData {
  login: string;
  password: string;
}

const schema = yup.object().shape({
  login: yup
    .string()
    .required('O nome de usuário é obrigatório!')
    .matches(/^\S+$/, 'O nome de usuário não pode conter espaços!'),
  password: yup.string().required('A senha é obrigatória'),
});

export default function Login(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const toast = useToast();

  const { signIn } = useAuth();

  const authenticate = useMutation(
    async ({ login, password }: SignInFormData): Promise<void> => {
      await signIn({ login, password });
    }
  );

  const onError = (error): void => error;

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
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <Image src="/images/logoVertical.svg" mb="16" />
        <VStack w="100%" spacing="8" p={6}>
          <Input
            name="login"
            placeholder="Nome de usuário"
            label="Login"
            isDark
            error={errors.login}
            {...register('login')}
          />
          <Input
            name="password"
            label="Senha"
            placeholder="Digite sua senha secreta"
            type="password"
            isDark
            error={errors.password}
            {...register('password')}
          />
        </VStack>
        <VStack p={6} w="100%">
          <Button
            type="submit"
            mt="16"
            isSubmitting={isSubmitting}
            isDisabled={isSubmitting}
          >
            ENTRAR
          </Button>
        </VStack>
      </Flex>
    </Grid>
  );
}
