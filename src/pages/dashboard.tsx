import { Flex, Heading } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';

import { Sidebar } from '../components/Sidebar';
import { withSSRAuth } from '../utils/withSSRAuth';

export default function Dashboard(): JSX.Element {
  return (
    <Flex>
      <Sidebar />
      <Flex>
        <Heading color="main.darkBlue" my={8}>
          Dashboard
        </Heading>
      </Flex>
    </Flex>
  );
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async ctx => {
  return {
    props: {},
  };
});
