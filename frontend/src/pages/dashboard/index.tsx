import { useState } from 'react';
import { canSSRAuth } from '../../utils/canSSRAuth'
import Head from 'next/head'
import { Header } from '../../components/Header'
import styles from './styles.module.scss';
import { FiRefreshCcw } from 'react-icons/fi'
import { setupAPIClient } from '../../services/api';
import { ModalOrder } from '../../components/ModalOrder';
import Modal from 'react-modal';

// Tipagem para as propriedades dos pedidos
type OrderProps = {
    Id: string;
    Mesa: string | number;
    Status: boolean;
    Rascunho: boolean;
    Nome: string | null;
}

// Propriedades recebidas pelo componente Dashboard
interface HomeProps {
    pedidos: OrderProps[];
}

// Tipagem detalhada para itens de pedidos, incluindo informações do produto
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

// Componente Dashboard para visualização e gestão de pedidos
export default function Dashboard({ pedidos }: HomeProps) {

 // Estados para gerenciar a lista de pedidos, item do modal e visibilidade do modal
    const [orderList, setOrderList] = useState(pedidos || []);
    const [modalItem, setModalItem] = useState<OrderItemProps[]>();
    const [modalVisible, setModalVisible] = useState(false);

// Funções para manipulação de estados e interações do usuário
    function handleCloseModal() {
        setModalVisible(false);
    }

 // Lógica para abrir o modal com detalhes do pedido específico
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
// Lógica para marcar um pedido como finalizado
    async function handleFinishItem(id: string) {
        const apiClient = setupAPIClient();
        await apiClient.put('/pedido/finalizado', {
            pedido_id: id
        })

        const response = await apiClient.get('/pedidos');
        setOrderList(response.data);
        setModalVisible(false);
    }
 // Lógica para atualizar a lista de pedidos
    async function handleRefreshOrders() {
        const apiClient = setupAPIClient();
        const response = await apiClient.get('/pedidos');
        setOrderList(response.data);        
    }
  // Configuração do Modal para acessibilidade
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

                        <button onClick={handleRefreshOrders}>

                            <FiRefreshCcw size={25} color="#3fffa3" />

                        </button>

                    </div>

                    <article className={styles.listOrders}>

                        {orderList.length === 0 && (
                            <span className={styles.emptyList}>Nenhum mesa aberta...</span>

                        )}

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
        {/* Condicional para exibição do modal com detalhes do pedido */}
                    {modalVisible && (
                        <ModalOrder

                            isOpen={modalVisible}
                            onRequestClose={handleCloseModal}
                            /* A exclamação no final indica ao compilador que não existe a possibilidade daquela variável ser null ou undefined */
                            pedido={modalItem!}
                            handleFinishOrder={handleFinishItem}

                        />
                    )}


                </main>

            </div>
        </>

    )

}

// Função getServerSideProps para autenticação no lado do servidor e pré-carregamento dos pedidos
export const getServerSideProps = canSSRAuth(async (ctx) => {

 // Lógica para buscar os pedidos iniciais do servidor
    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get('/pedidos');
    return {
        props: {
            pedidos: response.data
        }
    }
})