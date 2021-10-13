import { Flex, Heading, Box, SimpleGrid, Text } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { useQuery } from 'react-query';
import { useState } from 'react';
import { theme } from '../styles/theme';

import { Loading } from '../components/Loading';
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

interface DashboardResponse {
  dashboardData: Dashboard[];
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
  const { isLoading, data } = useQuery<DashboardResponse>('getStock', () =>
    api.get('/stocks/dashboard').then(response => {
      const dashboard = response.data;

      return dashboard;
    })
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Flex w="100vw">
      <Sidebar />
      {console.log(data)}
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
                    categories:
                      data.dashboardData.length > 0
                        ? data.dashboardData.map(cd => cd.item.name)
                        : [''],
                  },
                }}
                series={[
                  {
                    name: 'Saldo',
                    data:
                      data.dashboardData.length > 0
                        ? data.dashboardData.map(cd => cd.balance)
                        : [0],
                  },
                ]}
                type="bar"
                height={160}
              />
            </Box>
            <Box p={['6', '8']} bg="main.offWhite" borderRadius={8} pb="4">
              <Text>Quantidade total por item</Text>
              <Chart
                options={{
                  ...options,
                  xaxis: {
                    categories:
                      data.dashboardData.length > 0
                        ? data.dashboardData.map(cd => cd.item.name)
                        : [''],
                  },
                }}
                series={[
                  {
                    name: 'Total',
                    data:
                      data.dashboardData.length > 0
                        ? data.dashboardData.map(cd => cd.totalQtd)
                        : [0],
                  },
                ]}
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
