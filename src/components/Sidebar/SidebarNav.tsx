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

      <SidebarLink href="/dashboard" icon={RiDashboardFill}>
        Dashboard
      </SidebarLink>
      <SidebarLink href="/warehouse" icon={RiArchiveFill}>
        Estoque
      </SidebarLink>
      <SidebarLink href="/products" icon={RiDraftFill}>
        Cadastro
      </SidebarLink>
      <SidebarLink href="/settings" icon={RiSettings5Fill}>
        Configurções
      </SidebarLink>
    </Stack>
  );
}
