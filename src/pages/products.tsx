import {
  Flex,
  useDisclosure,
  Heading,
  Text,
  HStack,
  Table,
  Thead,
  Th,
  Tbody,
  Tr,
  Td,
  Image,
  Box,
} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { ModalRegisterItem } from '../components/ModalRegisterItem';
import { Button } from '../components/Button';
import { Sidebar } from '../components/Sidebar';
import { withSSRAuth } from '../utils/withSSRAuth';

export default function Products(): JSX.Element {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <Flex w="100%">
      <Sidebar />
      <Flex w="100%" flexDir="column" justifyContent="space-around" m="8">
        <HStack>
          <Image src="images/openedbox.svg" />
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
                <Th>Tipo</Th>
                <Th>Data</Th>
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
      <ModalRegisterItem isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async ctx => {
  return {
    props: {},
  };
});
