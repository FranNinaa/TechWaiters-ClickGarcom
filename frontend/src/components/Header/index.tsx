import {useContext} from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';
import { FiLogOut } from 'react-icons/fi'
import {AuthContext, signOut} from '../../context/AuthContext'

export function Header() {
    const { signOut } = useContext(AuthContext);
    return (
        <header className={styles.headerContainer} >
            <div className={styles.headerContent}>
                <Link href="/dashboard">
                    <img src="/logoHeader.PNG" width={200} height={50} />
                </Link>

                <nav className={styles.menuNav}>
                    <Link href="/category" legacyBehavior>
                        <a>Categoria</a>
                    </Link>

                    <Link href="/producto" legacyBehavior>
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