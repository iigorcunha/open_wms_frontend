import { Stack } from "@chakra-ui/react";
import { RiDashboardLine, RiTBoxLine, RiFileEditLine, RiSettingsLine } from "react-icons/ri";
import { SidebarLink } from "./SidebarLink";
import { SidebarProfile } from "./SidebarProfile";


export function SidebarNav() {
  return (
    <Stack ml='6' mt='10' spacing='8' align='flex-start'>
      <SidebarProfile name='Fulano de Tal' />

      <SidebarLink icon={RiDashboardLine}>Dashboard</SidebarLink>
      <SidebarLink icon={RiTBoxLine}>Estoque</SidebarLink>
      <SidebarLink icon={RiFileEditLine}>Cadastro</SidebarLink>
      <SidebarLink icon={RiSettingsLine}>Configurções</SidebarLink>
      
    </Stack>
  )
}