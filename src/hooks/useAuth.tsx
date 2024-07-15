import { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextState {
  status: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  //signOut(): void;
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
    const session_id = document.cookie.includes('session_id');

    if (session_id) {
      setStatus(true);
      return;
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

  // const signOut = useCallback(() => {
  //   localStorage.removeItem(keyStorageToken);
  //   localStorage.removeItem(keyStorage);

  //   setData({} as AuthState);
  // }, []);

  return (
    <AuthContext.Provider value={{ status: status, signIn }}>
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