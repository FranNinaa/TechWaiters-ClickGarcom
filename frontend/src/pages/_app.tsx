import '../../styles/globals.scss';
import { AppProps } from 'next/app';
import { AuthProvider } from '../context/AuthContext';

// Importa o componente ToastContainer do 'react-toastify', utilizado para mostrar notificações na aplicação.
import { ToastContainer } from 'react-toastify';

// Importa os estilos padrão do 'react-toastify' para as notificações.
import 'react-toastify/dist/ReactToastify.css';

// Componente MyApp que envolve todos os componentes da aplicação.
// Recebe as propriedades do componente e propriedades da página através de AppProps.
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider> {/* Envolve toda a aplicação no contexto de autenticação */}
      <Component {...pageProps} /> {/* Renderiza o componente da página atual com suas propriedades */}
      <ToastContainer autoClose={3000} /> {/* Adiciona um contêiner para as notificações com fechamento automático após 3 segundos */}
    </AuthProvider>
  );
}

// Exporta o componente MyApp como padrão.
export default MyApp;
