import { canSSRAuth } from '../../utils/canSSRAuth'
import Head from 'next/head'
import {Header} from'../../components/Header'

export default function Dashboard() {
    return (
        <>
        <Head>
        <title>Dashboard</title>
        </Head>
            <div>
                <Header/>
                <h1>
                   
                </h1>
            </div>
        </>

    )
  
}


export const getServerSideProps = canSSRAuth(async (ctx) => {
    return {
        props: {}
    }
})