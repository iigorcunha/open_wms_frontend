import {
  Flex,
  Text,
  HStack,
  Img,
  Box,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { ModalRegisterStock } from '../components/ModalRegisterStock';
import { Sidebar } from '../components/Sidebar';
import { Button } from '../components/Button';
import { setupApiClient } from '../services/api';
import { withSSRAuth } from '../utils/withSSRAuth';
import { RadioCard } from '../components/RadioCard';

export default function Warehouse(): JSX.Element {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <Flex w="100%">
      <Sidebar />
      <Flex bg="main.white" w="100%" borderRadius="20" ml="-10" p="8">
        <Flex w="100%" flexDir="column" justifyContent="space-around" m="0">
          <HStack>
            <Img src="images/openedbox.svg" />
            <Heading>Cadastro de produtos</Heading>
          </HStack>
          <Flex w="100%" justifyContent="space-between" align="space-between">
            <HStack spacing="6">
              <Text fontSize="2xl" fontWeight="600" color="main.darkBlue">
                Lista de produtos
              </Text>
              <Button>filtro</Button>
            </HStack>
            <Button onClick={onOpen}>Criar Item</Button>
          </Flex>
          <Box maxH="500px" overflowY="scroll">
            <Table>
              <Thead>
                <Tr>
                  <Th>Código</Th>
                  <Th>Nome</Th>
                  <Th>Categoria</Th>
                  <Th>Entrada</Th>
                  <Th>Saída</Th>
                  <Th>Qtde</Th>
                  <Th>Und</Th>
                  <Th>Valor</Th>
                  <Th>Criado em</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>1</Td>
                  <Td>Produto 1</Td>
                  <Td>Bebidas</Td>
                  <Td>16/05/2021</Td>
                  <Td>18/06/2021</Td>
                  <Td>10</Td>
                  <Td>Caixa</Td>
                  <Td>R$ 2500,00</Td>
                  <Td>16/05/2021</Td>
                </Tr>
                <Tr>
                  <Td>1</Td>
                  <Td>Produto 1</Td>
                  <Td>Bebidas</Td>
                  <Td>Entrada</Td>
                  <Td>20/01/2021</Td>
                  <Td>10</Td>
                  <Td>Caixa</Td>
                  <Td>R$ 2500,00</Td>
                  <Td>12/12/2020</Td>
                </Tr>
                <Tr>
                  <Td>1</Td>
                  <Td>Produto 1</Td>
                  <Td>Bebidas</Td>
                  <Td>Entrada</Td>
                  <Td>20/01/2021</Td>
                  <Td>10</Td>
                  <Td>Caixa</Td>
                  <Td>R$ 2500,00</Td>
                  <Td>12/12/2020</Td>
                </Tr>
              </Tbody>
            </Table>
          </Box>
        </Flex>
      </Flex>
      <ModalRegisterStock isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async ctx => {
  return {
    props: {},
  };
});
