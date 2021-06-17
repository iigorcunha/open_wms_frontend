import { Stack } from '@chakra-ui/react';
import {
  RiDashboardFill,
  RiArchiveFill,
  RiDraftFill,
  RiSettings5Fill,
} from 'react-icons/ri';
import { SidebarLink } from './SidebarLink';
import { SidebarProfile } from './SidebarProfile';

export function SidebarNav(): JSX.Element {
  return (
    <Stack ml="6" mt="10" spacing="8" align="flex-start">
      <SidebarProfile name="Fulano de Tal" />

      <SidebarLink icon={RiDashboardFill}>Dashboard</SidebarLink>
      <SidebarLink icon={RiArchiveFill}>Estoque</SidebarLink>
      <SidebarLink icon={RiDraftFill}>Cadastro</SidebarLink>
      <SidebarLink icon={RiSettings5Fill}>Configurções</SidebarLink>
    </Stack>
  );
}
