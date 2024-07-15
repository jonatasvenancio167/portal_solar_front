
import { AuthProvider } from './hooks/useAuth';
import { ToastProvider } from './hooks/useToast';
import './index.css'
import { AppRoutes } from './routes';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ToastProvider>
        <AppRoutes/>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;