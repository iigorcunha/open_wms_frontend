/* eslint-disable no-nested-ternary */
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
  Spinner,
  Grid,
} from '@chakra-ui/react';
import { format } from 'date-fns';
import { GetServerSideProps } from 'next';
import { useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import { ModalRegisterItem } from '../components/ModalRegisterItem';
import { Button } from '../components/Button';
import { Sidebar } from '../components/Sidebar';
import { withSSRAuth } from '../utils/withSSRAuth';
import { api } from '../services/apiClient';
import { useItems } from '../hooks/useItems';

export default function Products(): JSX.Element {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const { items, refetchItem, isLoading } = useItems();

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
          <Image src="images/openedbox.svg" />

          <Heading>Cadastro de produtos</Heading>
        </HStack>
        <Flex
          w="100%"
          justifyContent="space-between"
          align="center"
          id="middleBlock"
          mx="8"
        >
          <HStack spacing="6" w="30%">
            <Text
              fontSize="2xl"
              w="100%"
              fontWeight="600"
              color="main.darkBlue"
            >
              Lista de produtos
            </Text>
          </HStack>
          <Button mr="8" onClick={onOpen}>
            Criar Item
          </Button>
        </Flex>
        <Flex align="center" justifyContent="center" h="500px">
          {isLoading ? (
            <Spinner />
          ) : (
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
                    <Th textAlign="center">Nome</Th>
                    <Th textAlign="center">Categoria</Th>
                    <Th textAlign="center">Estoque Min.</Th>
                    <Th textAlign="center">Dias para aviso de vencimento</Th>
                    <Th textAlign="center">Und</Th>
                    <Th textAlign="center">Criado em</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {items &&
                    items?.map(item => (
                      <Tr key={item.id}>
                        <Td textAlign="center">{item.name}</Td>
                        <Td textAlign="center">{item.category}</Td>
                        <Td textAlign="center">{item.minimumStock}</Td>
                        <Td textAlign="center">
                          {item.daysToNotifyExpirationDate}
                        </Td>
                        <Td textAlign="center">{item.measureunity}</Td>
                        <Td textAlign="center">
                          {format(new Date(item.createdat), 'dd/MM/yyyy')}
                        </Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </Box>
          )}
        </Flex>
      </Grid>
      <ModalRegisterItem
        isOpen={isOpen}
        onClose={onClose}
        refetch={refetchItem}
      />
    </Flex>
  );
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async ctx => {
  return {
    props: {},
  };
});
