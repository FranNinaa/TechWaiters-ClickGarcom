import { useState } from 'react';
import { canSSRAuth } from '../../utils/canSSRAuth'
import Head from 'next/head'
import { Header } from '../../components/Header'
import styles from './styles.module.scss';
import { FiRefreshCcw } from 'react-icons/fi'
import { setupAPIClient } from '@/src/services/api';

type OrderProps = {
    Id: string;
    Mesa: string | number;
    Status: string | number;
    Rascunho: string | null;
}

interface HomeProps {
    pedidos: OrderProps[];
}

export default function Dashboard({ pedidos }: HomeProps) {

    const [orderList, setOrderList] = useState(pedidos || []);

    function  handleOpenModalView(id: string){
        
    }

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
                                <button onClick={()=> handleOpenModalView(item.Id)}>
                                    <div className={styles.tag}></div>
                                    <span>Mesa {item.Mesa}</span>
                                </button>
                            </section>
                        ))}


                    </article>

                </main>

            </div>
        </>

    )

}


export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get('/pedidos');
    console.log(response.data);
    return {
        props: {
            pedidos: response.data
        }
    }
})