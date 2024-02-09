import {useContext} from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';
import { Button } from '../../components/ui/Button'
import { FiLogOut } from 'react-icons/fi'
import {AuthContext, signOut} from '../../context/AuthContext'

export function Header() {
    const { signOut } = useContext(AuthContext);
    return (
        <header className={styles.headerContainer} >
            <div className={styles.headerContent}>
                <Link href="/dashboard">
                    <img src="/logoHeader.PNG" width={170} height={40} />
                </Link>

                <nav className={styles.menuNav}>
                    <Link href="/category" legacyBehavior>
                        <a>Categoria</a>
                    </Link>

                    <Link href="/product" legacyBehavior>
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