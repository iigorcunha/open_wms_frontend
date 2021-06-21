import {
  Flex,
  Text,
  HStack,
  Image,
  Box,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Icon,
  Tr,
  useDisclosure,
  Spinner,
  Select,
  Grid,
} from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { useForm } from 'react-hook-form';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { RiArrowUpFill, RiArrowDownFill } from 'react-icons/ri';
import { ModalRegisterStock } from '../components/ModalRegisterStock';
import { Sidebar } from '../components/Sidebar';
import { Button } from '../components/Button';
import { withSSRAuth } from '../utils/withSSRAuth';
import { api } from '../services/apiClient';
import { setupApiClient } from '../services/api';

interface Stock {
  id: string;
  itemId: string;
  type: string;
  quantity: number;
  value: number;
  expirationDate: string;
  createdAt: string;
}

interface Item {
  id: string;
  name: string;
}

interface StockData {
  stocks: Stock[];
  item: Item;
}

interface FilterFormData {
  filterByItem: string;
}

interface StockProps {
  listItems: Item[];
}

export default function Stock({ listItems }: StockProps): JSX.Element {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { handleSubmit, register } = useForm();
  const [filterItems, setFilterItems] = useState('');

  const { isLoading, refetch, data } = useQuery(
    ['getStock', filterItems],
    () =>
      api.get(`/stocks/byItem/${filterItems}`).then(response => response.data),
    {
      refetchOnWindowFocus: false,
      enabled: false,
    }
  );

  const stockListByItems = data as StockData;

  useEffect(() => {
    if (filterItems) {
      refetch();
    }
  }, [filterItems, refetch]);

  const onSubmit = ({ filterByItem }: FilterFormData): void => {
    setFilterItems(filterByItem);
    refetch();
  };
  return (
    <Flex w="100%">
      <Sidebar />
      <Grid
        templateAreas="'title' 'middleBlock' '1fr 1fr 1fr'"
        bg="main.white"
        w="100vw"
        borderRadius="20"
        ml="-10"
        p="8"
      >
        <HStack id="title" ml="8">
          <Image src="images/closedbox.svg" />

          <Heading>Estoque</Heading>
        </HStack>
        <Flex
          w="100%"
          justifyContent="space-between"
          align="center"
          id="middleBlock"
          mx="8"
        >
          <HStack
            spacing="6"
            w="30%"
            as="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Text
              fontSize="2xl"
              w="100%"
              fontWeight="600"
              color="main.darkBlue"
            >
              Movimentação de estoque
            </Text>
            <Select
              {...register('filterByItem')}
              placeholder="Select option"
              onSelect={event => setFilterItems(event.currentTarget.value)}
            >
              {listItems &&
                listItems.map(item => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
            </Select>
            <Button type="submit">Filtrar</Button>
          </HStack>
          <Button mr="8" onClick={onOpen}>
            Movimentar estoque
          </Button>
        </Flex>
        <Flex align="center" justifyContent="center" h="500px">
          {isLoading && <Spinner />}
          {stockListByItems?.item && (
            <Box
              maxH="500px"
              overflowY="scroll"
              css={{
                '&::-webkit-scrollbar': {
                  width: '4px',
                },
                '&::-webkit-scrollbar-track': {
                  width: '6px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: '#023047',
                  borderRadius: '24px',
                },
              }}
            >
              <Table>
                <Thead>
                  <Tr>
                    <Th fontSize="2xl">Item: {stockListByItems.item.name}</Th>
                  </Tr>
                  <Tr>
                    <Th textAlign="center">Movimentação</Th>
                    <Th textAlign="center">Qtde</Th>
                    <Th textAlign="center">Valor</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {stockListByItems.stocks.map(stock => (
                    <Tr key={stock.id}>
                      <Td textAlign="center">
                        {stock.type === 'input' ? (
                          <Icon
                            as={RiArrowUpFill}
                            color="main.green"
                            fontSize="2xl"
                          />
                        ) : (
                          <Icon
                            as={RiArrowDownFill}
                            color="red"
                            fontSize="2xl"
                          />
                        )}
                      </Td>
                      <Td>R$ {stock.quantity}</Td>
                      <Td>{stock.value}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          )}
        </Flex>
      </Grid>
      <ModalRegisterStock isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
}

export const getServerSideProps: GetServerSideProps<StockProps> = withSSRAuth(
  async ctx => {
    const apiClient = setupApiClient(ctx);

    const response = await apiClient.get('/items');
    return {
      props: {
        listItems: response.data.items,
      },
    };
  }
);
