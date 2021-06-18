import { Flex, Text, HStack, Img } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { Sidebar } from '../components/Sidebar';

export default function Stock(props): JSX.Element {
  return (
    <HStack spacing="-10">
      <Sidebar />
      <Flex bg="main.white" w="100vw" h="100vh" borderRadius="20">
        <Flex>
          <Img src="/images/closedbox.svg" w="32" h="32" ml="10" mt="10" />
          <Text
            ml="8"
            fontSize="50"
            mt="14"
            fontWeight="900"
            color="main.darkBlue"
          >
            Configurações
          </Text>
        </Flex>
      </Flex>
    </HStack>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};
