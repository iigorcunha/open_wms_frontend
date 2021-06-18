import { Stack } from '@chakra-ui/react';
import {
  RiDashboardLine,
  RiTBoxLine,
  RiFileEditLine,
  RiSettingsLine,
} from 'react-icons/ri';
import { SidebarLink } from './SidebarLink';
import { SidebarProfile } from './SidebarProfile';

export function SidebarNav(): JSX.Element {
  return (
    <Stack ml="6" mt="10" spacing="8" align="flex-start">
      <SidebarProfile name="Fulano de Tal" />

      <SidebarLink icon={RiDashboardLine} href="/dashboard">
        Dashboard
      </SidebarLink>
      <SidebarLink icon={RiTBoxLine} href="/stock">
        Estoque
      </SidebarLink>
      <SidebarLink icon={RiFileEditLine} href="/register">
        Cadastro
      </SidebarLink>
      <SidebarLink icon={RiSettingsLine} href="/settings">
        Configurções
      </SidebarLink>
    </Stack>
  );
}
