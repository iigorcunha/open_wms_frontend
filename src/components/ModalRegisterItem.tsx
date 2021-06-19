import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Flex,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { api } from '../services/apiClient';
import { queryClient } from '../services/queryClient';

import { Button } from './Button';
import { Input } from './Input';

interface ModalRegisterItemProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CreateItemFormData {
  code?: string;
  name: string;
  category: string;
  minimumStock?: number;
  daysToNotifyExpirationDate?: number;
  image?: string;
  measureUnity: string;
}

export function ModalRegisterItem({
  isOpen,
  onClose,
}: ModalRegisterItemProps): JSX.Element {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const toast = useToast();

  const createItem = useMutation(
    async ({
      name,
      category,
      minimumStock,
      daysToNotifyExpirationDate,
      measureUnity,
    }: CreateItemFormData) => {
      const response = await api.post('items', {
        name,
        category,
        minimumStock,
        daysToNotifyExpirationDate,
        measureUnity,
      });

      return response.data.user;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('items');
      },
    }
  );

  const onSubmit = async (item: CreateItemFormData): Promise<void> => {
    try {
      await createItem.mutateAsync(item);

      reset();

      onClose();

      toast({
        status: 'success',
        title: 'Sucesso!',
        description: 'O produto foi criado com sucesso!',
        position: 'top-right',
      });
    } catch (err) {
      toast({
        status: 'error',
        title: 'Algo deu errado!',
        description: err.response.data?.error,
        position: 'top-right',
      });
    }
  };
  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          align="center"
          justifyContent="center"
          color="main.darkBlue"
          fontWeight="600"
          fontSize="2xl"
        >
          Cadastro de produto
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex
            flexDirection="column"
            m="8"
            as="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <VStack>
              <Input
                name="code"
                label="Código"
                error={errors.code}
                {...register('code')}
              />
              <Input
                name="name"
                label="Nome do produto"
                error={errors.name}
                {...register('name')}
              />
              <Input
                name="category"
                label="Categoria"
                error={errors.category}
                {...register('category')}
              />
              <Input
                name="measureUnity"
                label="Unidade de medida"
                error={errors.measureUnity}
                {...register('measureUnity')}
              />
              <Input
                name="daysToNotifyExpirationDate"
                label="Dias mínimos para vencer (opcional)"
                error={errors.daysToNotifyExpirationDate}
                {...register('daysToNotifyExpirationDate')}
              />
              <Input
                name="minimumStock"
                label="Estoque mínimo (opcional)"
                error={errors.minimumStock}
                {...register('minimumStock')}
              />
            </VStack>
            <Button type="submit" mt="16">
              Cadastrar
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
