import { Box, Avatar, Text } from "@chakra-ui/react";

interface SidebarProfileProps {
  name: string;
}

export function SidebarProfile({ name }: SidebarProfileProps) {
  return (
    <Box justifyContent='center' mb='20'>
      <Avatar h={120} w={120} mb='4' borderRadius='50%' bgColor='#F5F5F5' />
      <Text ml='2' fontWeight='bold'>{name}</Text>
    </Box>
  )
}