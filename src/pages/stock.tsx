import { Flex, Text, HStack, Img } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { Sidebar } from '../components/Sidebar';
import { setupApiClient } from '../services/api';
import { withSSRAuth } from '../utils/withSSRAuth';

export default function Warehouse(): JSX.Element {
  return (
    <Flex>
      <Sidebar />
      <Flex
        bg="main.white"
        borderRadius="20"
        ml="-10"
        p="8"
        alignItems="flex-start"
      >
        <HStack>
          <Img src="/images/closedbox.svg" />
          <Text
            ml="8"
            fontSize="50"
            mt="14"
            fontWeight="900"
            color="main.darkBlue"
          >
            Estoque
          </Text>
        </HStack>
      </Flex>
    </Flex>
  );
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async ctx => {
  return {
    props: {},
  };
});
