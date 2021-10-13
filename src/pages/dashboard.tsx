import { Flex, Heading, Box, SimpleGrid, Text } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { theme } from '../styles/theme';

import { Sidebar } from '../components/Sidebar';
import { withSSRAuth } from '../utils/withSSRAuth';
import { setupApiClient } from '../services/api';

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

  let dashboard = [] as Dashboard[];

  try {
    const response = await apiClient.get('/stocks/dashboard');
    dashboard = response.data.dashboardData.map(dash => {
      return {
        itemId: dash.item.id,
        itemName: dash.item.name,
        balance: dash.balance,
        totalQtd: dash.totalQtd,
      };
    });
  } catch (err) {
    console.error(err);
  }

  return {
    props: {
      dashboard,
    },
  };
});
