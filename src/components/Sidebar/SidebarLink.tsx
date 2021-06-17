import { Box, Link, Icon, Text, LinkProps } from '@chakra-ui/react';
import { ElementType } from 'react';

interface SidebarLinkProps extends LinkProps {
  icon: ElementType;
  children: string;
}

export function SidebarLink({ icon, children }: SidebarLinkProps): JSX.Element {
  return (
    <Box>
      <Link display="flex" align="center">
        <Icon as={icon} fontSize="28" />
        <Text ml="2" mt="1" fontWeight="bold">
          {children}
        </Text>
      </Link>
    </Box>
  );
}
