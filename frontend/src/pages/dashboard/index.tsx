import { useState } from 'react';
import { canSSRAuth } from '../../utils/canSSRAuth'
import Head from 'next/head'
import { Header } from '../../components/Header'
import styles from './styles.module.scss';
import { FiRefreshCcw } from 'react-icons/fi'
import { setupAPIClient } from '../../services/api';
import { ModalOrder } from '../../components/ModalOrder';
import Modal from 'react-modal';


type OrderProps = {
    Id: string;
    Mesa: string | number;
    Status: boolean;
    Rascunho: boolean;
    Nome: string | null;
}

interface HomeProps {
    pedidos: OrderProps[];
}

export type OrderItemProps = {
    Id: string;
    Quantidade: number;
    Observacao: string;
    pedido_id: string;
    produto_id: string;
    produto: {
        Id: string;
        Nome: string;
        Descricao: string;
        Preco: string;
        Banner: string;
    }
    pedido: {
        Id: string;
        Mesa: string | number;
        Status: boolean;
        Nome: string | null;
    }

}

export default function Dashboard({ pedidos }: HomeProps) {

    const [orderList, setOrderList] = useState(pedidos || []);
    const [modalItem, setModalItem] = useState<OrderItemProps[]>();
    const [modalVisible, setModalVisible] = useState(false);

    function handleCloseModal() {
        setModalVisible(false);
    }

    async function handleOpenModalView(id: string) {
        const apiClient = setupAPIClient();
        const response = await apiClient.get('/detalhe/pedidos', {
            params: {
                pedido_id: id,
            }
        })
        console.log(id)
        setModalItem(response.data);
        setModalVisible(true);

    }

    Modal.setAppElement('#__next');

    return (
        <>
            <Head>
                <title>Dashboard</title>
            </Head>
            <div>
                <Header />

                <main className={styles.container}>

                    <div className={styles.containerHeader}>
                        <h1>Últimos pedidos</h1>

                        <button>

                            <FiRefreshCcw size={25} color="#3fffa3" />

                        </button>

                    </div>

                    <article className={styles.listOrders}>

                        {orderList.map(item => (
                            <section key={item.Id} className={styles.orderItem}>
                                <button onClick={() => handleOpenModalView(item.Id)}>
                                    <div className={styles.tag}></div>
                                    <span>Mesa {item.Mesa}</span>
                                </button>
                            </section>
                        ))}

                    </article>

                </main>

                <main>

                    {modalVisible && (
                        <ModalOrder

                            isOpen={modalVisible}
                            onRequestClose={handleCloseModal}
                            /* A exclamação no final indica ao compilador que não existe a possibilidade daquela variável ser null ou undefined */
                            pedido={modalItem!}

                        />
                    )}


                </main>

            </div>
        </>

    )

}


export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get('/pedidos');
    return {
        props: {
            pedidos: response.data
        }
    }
})