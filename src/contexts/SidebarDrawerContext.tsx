import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react';
import { createContext, ReactNode, useEffect } from 'react';

interface SidebarDrawerProviderProps {
  children: ReactNode;
}

export type SidebarDrawerContextData = UseDisclosureReturn;

const SidebarDrawerContext = createContext({} as SidebarDrawerContextData);

function SidebarDrawerProvider({
  children,
}: SidebarDrawerProviderProps): JSX.Element {
  const disclosure = useDisclosure();

  useEffect(() => {
    disclosure.onClose();
  }, [disclosure]);

  return (
    <SidebarDrawerContext.Provider value={disclosure}>
      {children}
    </SidebarDrawerContext.Provider>
  );
}

export { SidebarDrawerProvider, SidebarDrawerContext };
