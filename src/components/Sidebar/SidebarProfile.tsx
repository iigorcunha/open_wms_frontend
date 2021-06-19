import { Flex, Avatar, Text, IconButton, Icon } from '@chakra-ui/react';
import { RiShutDownLine } from 'react-icons/ri';
import { useAuth } from '../../hooks/useAuth';

export function SidebarProfile(): JSX.Element {
  const { signOut, user } = useAuth();
  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      mb="20"
      w="100%"
    >
      <Avatar
        mr="10"
        h={16}
        w={16}
        mb="4"
        borderRadius="50%"
        bgColor="#F5F5F5"
      />
      <Text mr="10" fontWeight="bold">
        {user?.login}
      </Text>

      <IconButton
        aria-label="shutdown"
        mr="10"
        borderRadius="full"
        color="red.500"
        colorScheme="transparent"
        size="sm"
        mt="8"
        onClick={signOut}
      >
        <Icon as={RiShutDownLine} fontSize="2xl" />
      </IconButton>
    </Flex>
  );
}
