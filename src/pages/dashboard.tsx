import {
  Flex,
  Heading,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { theme } from '../styles/theme';

import { Sidebar } from '../components/Sidebar';
import { api } from '../services/apiClient';
import { withSSRAuth } from '../utils/withSSRAuth';
import { setupApiClient } from '../services/api';

interface ItemSummaryData {
  item: {
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
  };
  totalQtd: number;
  balance: number;
}

interface Dashboard {
  itemId: string;
  itemName: string;
  balance: number;
  totalQtd: number;
}

interface DashboardProps {
  dashboard: Dashboard[];
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

export default function Dashboard({
  dashboard = [],
}: DashboardProps): JSX.Element {
  const [itemsSummary, setItemsSummary] = useState<ItemSummaryData[]>([]);
  const [chartData, setChartData] = useState([]);
  // const { isLoading, isError, error } = useQuery('getStock', () =>
  //   api.get('/stocks/dashboard').then(response => {
  //     setItemsSummary(response.data);
  //     setChartData(
  //       response.data.map(is => {
  //         return {
  //           itemId: is.item.id,
  //           itemName: is.item.name,
  //           balance: is.balance,
  //           totalQtd: is.totalQtd,
  //           measureunity: is.item.measureunity,
  //         };
  //       })
  //     );
  //   })
  // );

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
                    categories: dashboard.map(cd => cd.itemName),
                  },
                }}
                series={[
                  { name: 'Saldo', data: dashboard.map(cd => cd.balance) },
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
                  xaxis: { categories: dashboard.map(cd => cd.itemName) },
                }}
                series={[
                  { name: 'Total', data: dashboard.map(cd => cd.totalQtd) },
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
  const apiClient = setupApiClient(ctx);

  const response = await apiClient.get('/stocks/dashboard');
  const dashboard = response.data.dashboardData.map(dash => {
    return {
      itemId: dash.item.id,
      itemName: dash.item.name,
      balance: dash.balance,
      totalQtd: dash.totalQtd,
    };
  });

  return {
    props: {
      dashboard,
    },
  };
});
