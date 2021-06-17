import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider } from 'react-query';
import { theme } from '../styles/theme';
import { queryClient } from '../services/queryClient';
import { SidebarDrawerProvider } from '../contexts/SidebarDrawerContext';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
       <SidebarDrawerProvider>
        <Component {...pageProps} />
       </SidebarDrawerProvider>
     </QueryClientProvider>
    </ChakraProvider>
  );
}

export default MyApp;
