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
  Select,
  Box,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { DropdownSearch } from './DropdownSearch';
import { api } from '../services/apiClient';
import { queryClient } from '../services/queryClient';

import { Button } from './Button';
import { Input } from './Input';

interface ModalRegisterStockProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CreateStockFormData {
  itemId: string;
  quantity: number;
  expirationDate?: number;
  value: number;
  movement: string;
}

interface Item {
  userId: string;
  name: string;
  category: string;
  minimumStock: number;
  daysToNotifyExpirationDate: number;
  measureunity: string;
  id: string;
}

interface ItemsData {
  items: Item[];
}

export function ModalRegisterStock({
  isOpen,
  onClose,
}: ModalRegisterStockProps): JSX.Element {
  const [items, setItems] = useState<ItemsData>({ items: [] });
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const toast = useToast();

  const createStock = useMutation(
    async ({
      itemId,
      quantity,
      expirationDate,
      value,
      movement,
    }: CreateStockFormData) => {
      const response = await api.post(`stocks/${movement}`, {
        itemId,
        quantity,
        expirationDate,
        value,
      });

      return response.data.user;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('stock');
      },
    }
  );

  const { isLoading, error, data } = useQuery('getItems', () =>
    api.get('/items').then(response => response.data)
  );

  useEffect(() => {
    setItems(data);
  }, [data]);

  const onSubmit = async (item: CreateStockFormData): Promise<void> => {
    const removeEmptyItem = item;
    Object.keys(removeEmptyItem).forEach(key => {
      if (removeEmptyItem[key] === '' || removeEmptyItem[key] == null) {
        delete removeEmptyItem[key];
      }
    });
    try {
      await createStock.mutateAsync(removeEmptyItem);
      reset();
      onClose();
      toast({
        status: 'success',
        title: 'Sucesso!',
        description: 'O estoque foi criado com sucesso!',
        position: 'top-right',
      });
    } catch (err) {
      console.log(err.response);
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
              <DropdownSearch
                setValue={setValue}
                listItems={items?.items}
                name="itemId"
              />
              <Input
                name="expirationDate"
                label="Vencimento (opcional)"
                type="date"
                {...register('expirationDate')}
              />
              <Input
                name="quantity"
                label="Quantidade"
                {...register('quantity')}
              />
              <Input
                name="value"
                label="Valor unitário"
                {...register('value')}
              />
              <Box w="100%" maxW="450px">
                <Text fontWeight="600" color="main.darkBlue" ml="4">
                  Movimentação
                </Text>
                <Select
                  size="lg"
                  maxW={450}
                  borderRadius="20px"
                  bg="main.offWhite"
                  h="60px"
                  {...register('movement')}
                >
                  <option value="input">Entrada</option>
                  <option value="output">Saída</option>
                </Select>
              </Box>
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
