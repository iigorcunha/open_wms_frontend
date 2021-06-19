import { Flex, VStack, Image, Text, Spinner } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { LayoutMailVerification } from '../../components/LayoutMailVerification';

export default function MailVerification(): JSX.Element {
  const [status, setStatus] = useState('');
  const { query } = useRouter();
  const { verify } = query;

  useEffect(() => {
    setStatus('');
  }, []);

  if (!status) {
    return (
      <LayoutMailVerification>
        <Text fontSize="2xl" fontWeight="bold">
          Estamos verificado seu e-mail...
        </Text>
        <Spinner size="xl" color="main.green" />
      </LayoutMailVerification>
    );
  }

  if (status === 'success') {
    return (
      <LayoutMailVerification>
        <Image src="/images/successMail.svg" />
        <Text fontSize={['2xl', '2xl', '4xl']} fontWeight="bold">
          Email verificado com sucesso!
        </Text>
      </LayoutMailVerification>
    );
  }

  if (status === 'error') {
    return (
      <LayoutMailVerification>
        <Image src="/images/denyMail.svg" />
        <Text fontSize={['2xl', '2xl', '4xl']} fontWeight="bold">
          Token não existe
        </Text>
      </LayoutMailVerification>
    );
  }

  if (status === 'expired') {
    return (
      <LayoutMailVerification>
        <Image src="/images/denyMail.svg" />
        <VStack>
          <Text fontSize={['2xl', '2xl', '4xl']} fontWeight="bold">
            O link de confirmação do e-mail está expirado!
          </Text>
          <Text fontSize={['lg', 'lg', 'xl']}>
            Enviamos outro e-mail com um novo link para que possa confirmar seu
            e-mail!
          </Text>
        </VStack>
      </LayoutMailVerification>
    );
  }
}
