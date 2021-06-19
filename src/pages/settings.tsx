import {
  Flex,
  Heading,
  Box,
  Text,
  Stack,
  useToast,
  Button as ChakraButton,
} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import { Input } from '../components/Input';

import { Sidebar } from '../components/Sidebar';
import { Button } from '../components/Button';
import { withSSRAuth } from '../utils/withSSRAuth';
import { useAuth } from '../hooks/useAuth';
import { api } from '../services/apiClient';

interface RegisterFormData {
  name: string;
  email: string;
}
interface PasswordFormData {
  oldPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}

const registerSchema = yup.object().shape({
  name: yup.string(),
  email: yup.string(),
});

const passwordSchema = yup.object().shape({
  oldPassword: yup.string().required('A senha antiga é obrigatório!'),
  newPassword: yup.string().required('A nova senha é obrigatório!'),
  newPasswordConfirm: yup
    .string()
    .required('A confirmação de senha é obrigatória!')
    .oneOf([yup.ref('newPassword'), null], 'As senhas não batem!'),
});

export default function Settings(): JSX.Element {
  const toast = useToast();
  const { user } = useAuth();

  const [notifyEmail, setNotifyEmail] = useState(false);
  const [notifySms, setNotifySms] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
    defaultValues: { name: user?.name || '', email: user?.email || '' },
  });

  const {
    handleSubmit: handleSubmitPassword,
    register: registerPassword,
    formState: { errors: errorsPassword },
  } = useForm<PasswordFormData>({ resolver: yupResolver(passwordSchema) });

  const handleChangeRegister = async ({
    name,
    email,
  }: RegisterFormData): Promise<void> => {
    try {
      // await api.put(`users/${user.id}`, {
      //   name,
      //   email,
      // });
      toast({
        duration: 3000,
        status: 'success',
        title: 'Sucesso!',
        description: 'nome e/ou email alterados!',
        position: 'top-right',
      });
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

  const handleChangePassword = async ({
    oldPassword,
    newPassword,
    newPasswordConfirm,
  }: PasswordFormData): Promise<void> => {
    try {
      console.log({ oldPassword, newPassword, newPasswordConfirm });
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

  const handleAlerts = async (event): Promise<void> => {
    try {
      event.preventDefault();
      console.log({ notifyEmail, notifySms });
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
    <Flex>
      <Sidebar />
      <Flex
        bg="main.white"
        borderRadius="20"
        ml="-10"
        p="8"
        flexDirection="column"
        w="100%"
      >
        <Heading color="main.darkBlue" my={8}>
          Configurações
        </Heading>
        <Flex>
          <Box maxW="400px" w="100vw" mr="20">
            <Text mb="5" color="main.darkBlue" fontSize="2xl" fontWeight="700">
              Perfil
            </Text>
            <Box as="form" onSubmit={handleSubmit(handleChangeRegister)}>
              <Stack align="center" mb="8">
                <Input
                  padding="0"
                  pl="30px"
                  height="50px"
                  name="name"
                  label="Nome"
                  error={errors.name}
                  {...register('name')}
                />
                <Input
                  padding="0"
                  pl="30px"
                  height="50px"
                  name="email"
                  label="Email"
                  error={errors.email}
                  {...register('email')}
                />
                <Button type="submit" maxW="250px">
                  <Text color="main.darkBlue" fontSize="2xl" fontWeight="700">
                    Alterar Cadastro
                  </Text>
                </Button>
              </Stack>
            </Box>
            <Box
              as="form"
              onSubmit={handleSubmitPassword(handleChangePassword)}
            >
              <Stack align="center">
                <Input
                  type="password"
                  padding="0"
                  pl="30px"
                  height="50px"
                  name="oldPassword"
                  label="Senha antiga"
                  error={errorsPassword.oldPassword}
                  {...registerPassword('oldPassword')}
                />
                <Input
                  type="password"
                  padding="0"
                  pl="30px"
                  height="50px"
                  name="newPassword"
                  label="Nova senha"
                  error={errorsPassword.newPassword}
                  {...registerPassword('newPassword')}
                />
                <Input
                  type="password"
                  padding="0"
                  pl="30px"
                  height="50px"
                  name="newPasswordConfirm"
                  label="Confirmação de nova senha"
                  error={errorsPassword.newPasswordConfirm}
                  {...registerPassword('newPasswordConfirm')}
                />
                <Button type="submit" maxW="250px">
                  <Text color="main.darkBlue" fontSize="2xl" fontWeight="700">
                    Alterar Senha
                  </Text>
                </Button>
              </Stack>
            </Box>
          </Box>
          <Box maxW="350px" w="100vw">
            <Text mb="12" color="main.darkBlue" fontSize="2xl" fontWeight="700">
              Notificações
            </Text>
            <Box as="form" onSubmit={handleAlerts}>
              <Stack spacing="8">
                <Flex
                  align="center"
                  color="main.darkBlue"
                  fontSize="2xl"
                  fontWeight="700"
                >
                  <Text>Ativar alertas por email:</Text>
                  <ChakraButton
                    ml="auto"
                    w="48px"
                    h="48px"
                    bg="main.offWhite"
                    borderRadius="10px"
                    p="0"
                    onClick={() => setNotifyEmail(!notifyEmail)}
                  >
                    {notifyEmail && (
                      <Box
                        w="32px"
                        h="32px"
                        bg="main.darkBlue"
                        borderRadius="10px"
                        m="auto"
                      />
                    )}
                  </ChakraButton>
                </Flex>
                <Flex
                  align="center"
                  color="main.darkBlue"
                  fontSize="2xl"
                  fontWeight="700"
                >
                  <Text>Ativar alertas por sms: </Text>
                  <ChakraButton
                    ml="auto"
                    w="48px"
                    h="48px"
                    bg="main.offWhite"
                    borderRadius="10px"
                    p="0"
                    onClick={() => setNotifySms(!notifySms)}
                  >
                    {notifySms && (
                      <Box
                        w="32px"
                        h="32px"
                        bg="main.darkBlue"
                        borderRadius="10px"
                        m="auto"
                      />
                    )}
                  </ChakraButton>
                </Flex>
                <Flex w="100%" justify="center">
                  <Button type="submit" maxW="250px">
                    <Text color="main.darkBlue" fontSize="2xl" fontWeight="700">
                      Salvar alertas
                    </Text>
                  </Button>
                </Flex>
              </Stack>
            </Box>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async ctx => {
  return {
    props: {},
  };
});
