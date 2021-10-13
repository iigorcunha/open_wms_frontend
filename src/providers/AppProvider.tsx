import { AuthProvider } from '../contexts/AuthContext';
import { ItemProvider } from '../contexts/ItemContext';
import { SidebarDrawerProvider } from '../contexts/SidebarDrawerContext';

interface AppProviderProps {
  children: React.ReactElement;
}

export function AppProvider({ children }: AppProviderProps): JSX.Element {
  return (
    <AuthProvider>
      <ItemProvider>
        <SidebarDrawerProvider>{children}</SidebarDrawerProvider>
      </ItemProvider>
    </AuthProvider>
  );
}
