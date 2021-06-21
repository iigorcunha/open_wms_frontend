import { Grid, Box, Flex, Image, useToast, VStack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { api } from '../services/apiClient';
import { queryClient } from '../services/queryClient';

interface ICreateUserFormData {
  name: string;
  login: string;
  email: string;
  phone: string;
  password: string;
  passwordConfirmation?: string;
}

const phoneRegex = /(?:(^\+\d{2})?)(?:([1-9]{2})|([0-9]{3})?)(\d{4,5})(\d{4})/;

const schema = yup.object().shape({
  name: yup.string().required('O nome é obrigatório!'),
  login: yup
    .string()
    .required('O nome de usuário é obrigatório!')
    .matches(/^\S+$/, 'O nome de usuário não pode conter espaços!'),
  email: yup
    .string()
    .email('Formato de email inválido')
    .required('O email é obrigatório!'),
  phone: yup
    .string()
    .matches(phoneRegex, 'O número de telefone não é válido!')
    .required('O número de telefone é obrigatório!'),
  password: yup
    .string()
    .min(6, 'A senha precisa ter pelo menos 6 dígitos!')
    .required('A senha é obrigatória'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'As senhas precisam ser iguais!')
    .required('A confirmação de senha é obrigatória'),
});

export default function SignUp(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateUserFormData>({ resolver: yupResolver(schema) });

  const toast = useToast();
  const router = useRouter();

  const createUser = useMutation(
    async ({ name, login, email, phone, password }: ICreateUserFormData) => {
      const response = await api.post('users', {
        name,
        login,
        email,
        phone,
        password,
      });

      return response.data.user;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('users');
      },
    }
  );

  const onError = (error): void => error;

  const onSubmit = async (user: ICreateUserFormData): Promise<void> => {
    try {
      await createUser.mutateAsync(user);

      toast({
        duration: 3000,
        status: 'success',
        title: 'Usuário criado!',
        description: 'Usuário criado com sucesso!',
        position: 'top-right',
      });

      router.push('/login');
    } catch (err) {
      console.log(err.response);
      toast({
        duration: 3000,
        status: 'error',
        title: 'Alguma coisa deu errado!',
        description: err.response?.data.error,
        position: 'top-right',
      });
    }
  };
  return (
    <Grid templateAreas="'1fr 1fr'" h="100vh">
      <Flex
        w="100%"
        bg="main.darkBlue"
        flexDir="column"
        alignItems="center"
        justifyContent="center"
        pb="8"
        pt="8"
        as="form"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <Image src="/images/logoVertical.svg" mb="16" />
        <VStack w="100%">
          <Input
            isDark
            name="name"
            label="Nome Completo"
            error={errors.name}
            placeholder="João da Silva"
            {...register('name')}
          />
          <Input
            isDark
            name="login"
            label="Usuário"
            error={errors.login}
            placeholder="usuário"
            {...register('login')}
          />
          <Input
            isDark
            name="email"
            label="Email"
            placeholder="seuemail@email.com.br"
            error={errors.email}
            {...register('email')}
          />
          <Input
            isDark
            name="phone"
            leftInputElement="🇧🇷"
            placeholder="XX988776655"
            label="Número de telefone"
            error={errors.phone}
            {...register('phone')}
          />
          <Input
            isDark
            name="password"
            label="Senha"
            type="password"
            placeholder="Senha de no mínimo 6 digitos"
            error={errors.password}
            {...register('password')}
          />
          <Input
            isDark
            name="passwordConfirmation"
            label="Confirmação de Senha"
            placeholder="Confirme sua senha igual a anterior"
            type="password"
            error={errors.passwordConfirmation}
            {...register('passwordConfirmation')}
          />
        </VStack>
        <Button type="submit" mt="8">
          CADASTRAR
        </Button>
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
