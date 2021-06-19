import {
  Flex,
  Heading,
  Box,
  Text,
  Stack,
  useToast,
  SimpleGrid,
  Button as ChakraButton,
} from '@chakra-ui/react';
import { RiPencilLine, RiSaveLine } from 'react-icons/ri';
import { GetServerSideProps } from 'next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import { useEffect } from 'react';
import { Input } from '../components/Input';

import { Sidebar } from '../components/Sidebar';
import { Button } from '../components/Button';
import { withSSRAuth } from '../utils/withSSRAuth';
import { useAuth } from '../hooks/useAuth';

interface RegisterFormData {
  name: string;
  email: string;
  login: string;
  phone: string;
}
interface PasswordFormData {
  oldPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}

const registerSchema = yup.object().shape({
  name: yup.string().required('O campo de nome nao pode estar vazio!'),
  email: yup
    .string()
    .email('O email não é valido!')
    .required('O campo de email nao pode estar vazio!'),
  login: yup.string().required('O campo de login nao pode estar vazio!'),
  phone: yup.string().required('O campo de telefone nao pode estar vazio!'),
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
  const { user, updateUserInformation } = useAuth();

  const [notifyEmail, setNotifyEmail] = useState(true);
  const [notifySms, setNotifySms] = useState(true);

  const [isEditing, setIsEditing] = useState(false);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
  });

  const {
    handleSubmit: handleSubmitPassword,
    register: registerPassword,
    reset,
    formState: { errors: errorsPassword },
  } = useForm<PasswordFormData>({ resolver: yupResolver(passwordSchema) });

  useEffect(() => {
    if (user) {
      setValue('name', user.name);
      setValue('email', user.email);
      setValue('login', user.login);
      setValue('phone', user.phone);
    }
  }, [user]);

  const handleChangeRegister = async ({
    name,
    email,
    login,
    phone,
  }: RegisterFormData): Promise<void> => {
    try {
      await updateUserInformation({ name, email, login, phone });
      toast({
        duration: 3000,
        status: 'success',
        title: 'Sucesso!',
        description: 'Seus dados foram alterados!',
        position: 'top-right',
      });
      setIsEditing(false);
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
  }: PasswordFormData): Promise<void> => {
    try {
      const isSuccess = await updateUserInformation({
        currentPassword: oldPassword,
        newPassword,
      });
      if (!isSuccess) {
        return;
      }
      toast({
        duration: 3000,
        status: 'success',
        title: 'Sucesso!',
        description: 'Sua senha foi alterada!',
        position: 'top-right',
      });
      reset();
    } catch (err) {
      toast({
        duration: 3000,
        status: 'error',
        title: 'Algo deu errado',
        description: 'Não conseguimos atualizar sua senha!',
        position: 'top-right',
      });
    }
  };

  const handleAlerts = async (event): Promise<void> => {
    try {
      event.preventDefault();
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
        ml={['0', '0', '0', '-10']}
        p="8"
        flexDirection="column"
        w="100%"
        h="100vh"
        align="center"
        justify="center"
      >
        <Flex p="8" w="100%" justify="flex-start">
          <Heading color="main.darkBlue" my={8}>
            Configurações
          </Heading>
        </Flex>
        <Flex overflowY="scroll" w="100%" maxW={1480} flexWrap="wrap" p="8">
          <Box
            w="100%"
            maxW="500px"
            as="form"
            onSubmit={handleSubmit(handleChangeRegister)}
          >
            <Text mb="5" color="main.darkBlue" fontSize="2xl" fontWeight="700">
              Perfil
            </Text>
            <Stack align="center" mb="8">
              <Input
                isDisabled={!isEditing}
                padding="0"
                pl="30px"
                height="50px"
                name="name"
                label="Nome"
                error={errors.name}
                {...register('name')}
              />
              <Input
                isDisabled={!isEditing}
                padding="0"
                pl="30px"
                height="50px"
                name="login"
                label="Usuario:"
                error={errors.login}
                {...register('login')}
              />
              <Input
                isDisabled={!isEditing}
                padding="0"
                pl="30px"
                height="50px"
                name="email"
                label="Email"
                error={errors.email}
                {...register('email')}
              />
              <Input
                isDisabled={!isEditing}
                padding="0"
                pl="30px"
                height="50px"
                name="phone"
                label="Telefone:"
                error={errors.phone}
                {...register('phone')}
              />
              <SimpleGrid columns={2} spacing={10}>
                <Button type="submit" isDisabled={!isEditing}>
                  <Text
                    mr="2"
                    color="main.darkBlue"
                    fontSize="2xl"
                    fontWeight="700"
                  >
                    Salvar
                  </Text>
                  <RiSaveLine size="30px" />
                </Button>
                <Button
                  bg="main.yellow80"
                  _hover={{
                    bg: 'main.yellow',
                  }}
                  _active={{}}
                  isDisabled={isEditing}
                  onClick={() => setIsEditing(true)}
                >
                  <Text
                    mr="2"
                    color="main.darkBlue"
                    fontSize="2xl"
                    fontWeight="700"
                  >
                    Editar
                  </Text>
                  <RiPencilLine size="30px" />
                </Button>
              </SimpleGrid>
            </Stack>
          </Box>
          <Box mb="5" as="form" w="100%" maxW="500px" onSubmit={handleAlerts}>
            <Text mb="12" color="main.darkBlue" fontSize="2xl" fontWeight="700">
              Notificações
            </Text>
            <Stack spacing="8">
              <Flex
                align="center"
                color="main.darkBlue"
                fontSize="2xl"
                fontWeight="700"
              >
                <Text>Ativar alertas por email:</Text>
                <ChakraButton
                  isDisabled
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
                  isDisabled
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
                <Button disabled type="submit" maxW="250px">
                  <Text color="main.darkBlue" fontSize="2xl" fontWeight="700">
                    Salvar alertas
                  </Text>
                </Button>
              </Flex>
            </Stack>
          </Box>
          <Box
            w="100%"
            maxW="500px"
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
