import Modal from 'react-modal';
import styles from './styles.module.scss'
import { FiX } from 'react-icons/fi'

import { OrderItemProps } from '../../pages/dashboard';

interface ModalOrderProps {
    isOpen: boolean;
    onRequestClose: () => void;
    pedido: OrderItemProps[];
    handleFinishOrder: (id: string) => void;
}

export function ModalOrder({ isOpen, onRequestClose, pedido, handleFinishOrder }: ModalOrderProps) {
    const custonStyles = {
        content: {
            top: '50%',
            botton: 'auto',
            left: '50%',
            rigth: 'auto',
            padding: '30px',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#1d1d2e',
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={custonStyles}
        >
            <button
                type='button'
                onClick={onRequestClose}
                className='react-modal-close'
                style={{ backgroundColor: 'transparent', border: 0 }}>
                <FiX size={45} color='#f34748' />
            </button>

            <div className={styles.container}>

                <h2>Detalhes do pedido</h2>
                <span className={styles.table}>
                    Mesa: <strong>{pedido[0].pedido.Mesa}</strong>
                </span>

                {pedido.map(item => (
                    <section key={item.Id} className={styles.containerItem}>
                        <span> {item.Quantidade} - <strong>{item.produto.Nome}</strong></span>
                        <span className={styles.description}>
                            {item.produto.Descricao}
                        </span>
                    </section>
                ))}

                <button className={styles.buttonOrder} onClick={() => handleFinishOrder(pedido[0].pedido_id)}>
                    Concluir pedido
                </button>

            </div>
        </Modal>
    )
}
