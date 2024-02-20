import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import styles from './styles.module.scss'; // Importação dos estilos

// Interface para estender as propriedades padrão de um elemento input
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

// Interface para estender as propriedades padrão de um elemento textarea
interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

// Componente Input: Componente reutilizável para input de texto, estende todas as propriedades de um input HTML
export function Input({...rest}: InputProps) {
    return (
        <input className={styles.input} {...rest} />
    );
}

// Componente TextArea: Componente reutilizável para área de texto, estende todas as propriedades de um textarea HTML
export function TextArea({...rest}: TextAreaProps) {
    return (
        <textarea className={styles.input} {...rest}></textarea>
    );
}
