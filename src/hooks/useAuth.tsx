import { useContext } from 'react';
import { AuthContext, AuthContextData } from '../contexts/AuthContext';

const useAuth = (): AuthContextData => useContext(AuthContext);

export { useAuth };
