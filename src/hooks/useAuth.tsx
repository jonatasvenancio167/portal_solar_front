import { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextState {
  status: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

interface AuthStateRequest {
  status: boolean | undefined;
}

interface Props {
  children: JSX.Element | JSX.Element;
}

const AuthContext = createContext<AuthContextState>({} as AuthContextState);

const AuthProvider = ({ children }: Props) => {

  const [status, setStatus] = useState(false);

  const signIn = useCallback(async ({ email, password  }: SignInCredentials) => {
    const session_id = document.cookie.includes('_interslice_session') && document.cookie.includes('_session_id');

    if (session_id) {
      setStatus(true);
      window.location.href = '/'
    }
    
    const response = await api.post<AuthStateRequest>('clients/sign_in', {
      client: {
        email,
        password
      }
    });

    if(response.status === 200) {
      setStatus(true)
    }
  }, []);

  const signOut = useCallback(() => {
    document.cookie = `_interslice_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    document.cookie = `_session_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    window.location.href = '/'
  }, []);

  return (
    <AuthContext.Provider value={{ status: status, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextState {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('insira o authprovider ao redor do seu elemento');
  }
  return context;
}

export { AuthProvider, useAuth };