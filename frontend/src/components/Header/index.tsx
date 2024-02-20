import {useContext} from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';
import { Button } from '../../components/ui/Button'
import { FiLogOut } from 'react-icons/fi'
import {AuthContext, signOut} from '../../context/AuthContext'

// Componente Header: representa o cabeçalho da aplicação
export function Header() {

    // Utiliza o contexto de autenticação para acessar a função de logout
    const { signOut } = useContext(AuthContext);

    // Renderiza o componente de cabeçalho
    return (
        <header className={styles.headerContainer} >
            <div className={styles.headerContent}>
                <Link href="/dashboard">
                    <img src="/logoHeader.PNG" width={170} height={40} />
                </Link>

                <nav className={styles.menuNav}>
                    <Link href="/category" legacyBehavior>
                        <a>Nova Categoria</a>
                    </Link>

                    <Link href="/product" legacyBehavior>
                        <a>Novo Produto</a>
                    </Link>

                    <Link href="/cardapio" legacyBehavior>
                        <a>Cardapio</a>
                    </Link>

                    <button onClick={signOut}>
                        <FiLogOut color='#fff' size={20} />
                    </button>

                </nav>
            </div>
        </header>
    )
}