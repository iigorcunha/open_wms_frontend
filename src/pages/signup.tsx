import { Grid, Box, Flex, Image, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { api } from '../services/api';
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
      toast({
        duration: 3000,
        status: 'error',
        title: 'Alguma coisa deu errado!',
        description: err.response.data.error,
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
        <Image src="/images/wmsLogo.svg" mb="8" />
        <Input
          name="name"
          label="Nome Completo"
          error={errors.name}
          {...register('name')}
        />
        <Input
          name="login"
          label="Usuário"
          error={errors.login}
          {...register('login')}
        />
        <Input
          name="email"
          label="Email"
          error={errors.email}
          {...register('email')}
        />
        <Input
          name="phone"
          label="Número de telefone"
          error={errors.phone}
          {...register('phone')}
        />
        <Input
          name="password"
          label="Senha"
          type="password"
          error={errors.password}
          {...register('password')}
        />
        <Input
          name="passwordConfirmation"
          label="Confirmação de Senha"
          type="password"
          error={errors.passwordConfirmation}
          {...register('passwordConfirmation')}
        />
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
