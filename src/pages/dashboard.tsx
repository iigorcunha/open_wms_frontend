import { Flex, Heading, Box, SimpleGrid, Text } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { useQuery } from 'react-query';
import { theme } from '../styles/theme';

import { Sidebar } from '../components/Sidebar';
import { withSSRAuth } from '../utils/withSSRAuth';
import { api } from '../services/apiClient';

interface Item {
  id: string;
  userId: string;
  name: string;
  category: string;
  minimumStock: number;
  daysToNotifyExpirationDate: number;
  image: number;
  imageUrl: number;
  measureUnity: string;
  createdAt: string;
  updatedAt: string;
}

interface Dashboard {
  item: Item;
  balance: number;
  totalQtd: number;
}

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});
const options = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.main.darkBlue,
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },

  xAxis: {
    axisBorder: {
      color: theme.colors.main.darkBlue,
    },
    axisTicks: {
      color: theme.colors.main.darkBlue,
    },
  },
  fill: {
    opacity: 1,
  },
};

export default function Dashboard(): JSX.Element {
  const { isLoading, isError, error, data } = useQuery<Dashboard[]>(
    'getStock',
    () =>
      api.get('/stocks/dashboard').then(response => {
        const dashboard = response.data;
        return dashboard;
      })
  );

  return (
    <Flex w="100vw">
      <Sidebar />
      <Flex
        bg="main.white"
        borderRadius="20"
        ml="-10"
        p="8"
        flexDirection="column"
        w="100%"
      >
        <Heading color="main.darkBlue" my={8}>
          Dashboard
        </Heading>
        <Flex maxW={1280}>
          <SimpleGrid flex="1" gap="4" minChildWidth="450px" align="flex-start">
            <Box p={['6', '8']} bg="main.offWhite" borderRadius={8} pb="4">
              <Text>Saldo por item</Text>
              <Chart
                options={{
                  ...options,
                  tooltip: {
                    y: {
                      formatter: val => `R$ ${val}`,
                    },
                  },
                  xaxis: {
                    categories: data.map(cd => cd.item.name),
                  },
                }}
                series={[{ name: 'Saldo', data: data.map(cd => cd.balance) }]}
                type="bar"
                height={160}
              />
            </Box>
            <Box p={['6', '8']} bg="main.offWhite" borderRadius={8} pb="4">
              <Text>Quantidade total por item</Text>
              <Chart
                options={{
                  ...options,
                  xaxis: { categories: data.map(cd => cd.item.name) },
                }}
                series={[{ name: 'Total', data: data.map(cd => cd.totalQtd) }]}
                type="bar"
                height={160}
              />
            </Box>
          </SimpleGrid>
        </Flex>
      </Flex>
    </Flex>
  );
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async ctx => {
  return {
    props: {},
  };
});
