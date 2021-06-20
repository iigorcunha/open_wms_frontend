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

interface ModalRegisterStockProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CreateStockFormData {
  name: string;
  category: string;
  quantity: number;
  expirationDate?: number;
  value: number;
}

export function ModalRegisterStock({
  isOpen,
  onClose,
}: ModalRegisterStockProps): JSX.Element {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const toast = useToast();

  const createStock = useMutation(
    async ({
      name,
      category,
      quantity,
      expirationDate,
      value,
    }: CreateStockFormData) => {
      const response = await api.post('stock', {
        name,
        category,
        quantity,
        expirationDate,
        value,
      });

      return response.data.user;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('items');
      },
    }
  );

  const onSubmit = async (stock: CreateStockFormData): Promise<void> => {
    try {
      await createStock.mutateAsync(stock);

      reset();

      onClose();

      toast({
        status: 'success',
        title: 'Sucesso!',
        description: 'O estoque foi criado com sucesso!',
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
          Cadastro de estoque
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
                name="name"
                label="Nome do produto"
                {...register('name')}
              />
              <Input
                name="category"
                label="Categoria"
                {...register('category')}
              />
              <Input
                name="quantity"
                label="Unidade de medida"
                {...register('quantity')}
              />
              <Input
                name="expirationDate"
                label="Vencimento (opcional)"
                {...register('expirationDate')}
              />
              <Input
                name="value"
                label="Valor unitário"
                {...register('value')}
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
