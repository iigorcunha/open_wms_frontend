import { AuthProvider } from '../../contexts/AuthContext';
import { SidebarDrawerProvider } from '../../contexts/SidebarDrawerContext';

interface AppProviderProps {
  children: React.ReactElement;
}

export function AppProvider({ children }: AppProviderProps): JSX.Element {
  return (
    <AuthProvider>
      <SidebarDrawerProvider>{children}</SidebarDrawerProvider>
    </AuthProvider>
  );
}
