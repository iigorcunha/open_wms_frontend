import {
  Link as ChakraLink,
  Icon,
  Text,
  LinkProps as ChakraLinkProps,
} from '@chakra-ui/react';
import { ElementType } from 'react';
import { ActiveLink } from '../ActiveLink';

interface SidebarLinkProps extends ChakraLinkProps {
  icon: ElementType;
  children: string;
  href: string;
}

export function SidebarLink({
  icon,
  children,
  href,
  ...rest
}: SidebarLinkProps): JSX.Element {
  return (
    <ActiveLink href={href} passHref>
      <ChakraLink
        {...rest}
        display="flex"
        align="center"
        pl="4"
        pt="2.5"
        pb="2"
        pr="16"
        borderLeftRadius="25"
        textDecorationLine="none"
      >
        <Icon as={icon} w="9" h="9" />
        <Text mt="1" ml="2" fontWeight="bold" textDecor="none">
          {children}
        </Text>
      </ChakraLink>
    </ActiveLink>
  );
}
