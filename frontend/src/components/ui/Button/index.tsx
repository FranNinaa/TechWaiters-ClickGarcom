import { ReactNode, ButtonHTMLAttributes } from 'react'
import styles from './styles.module.scss'
import { FaSpinner } from 'react-icons/fa'

// Interface para as propriedades do componente Button, estendendo as propriedades padrão de botões HTML
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean,
    children: ReactNode,
}
// Componente Button: Renderiza um botão com suporte a estado de carregamento
export function Button({ loading, children, ...rest }: ButtonProps) {
    return (
        <button
        className={styles.button}
        disabled={loading}
        {...rest}
        >
            {loading ? (
            // Exibe um ícone de spinner se o botão estiver carregando
                <FaSpinner color='#fff' size={16} />
            ) : (
                
            // Caso contrário, renderiza o conteúdo do botão (children)
                <a className={styles.buttonText}>
                    {children}
                </a>
            )}


        </button>
    )
}