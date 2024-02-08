import { useState, FormEvent } from "react"
import Head from "next/head"
import {Header} from '../../components/Header'
import styles from './styles.module.scss'
import { setupAPIClient } from "../../services/api"
import { toast } from "react-toastify"


export default function Category() {
    const [nome, setNome] = useState('')

    async function handleRegisterCategory(event: FormEvent) {
        event.preventDefault()

        if(nome === ''){
            return alert('Preencha o campo Nome da Categoria')
        }

        const apiClient = setupAPIClient()
        await apiClient.post('/category', {
           Nome: nome
        })
        toast.success('Categoria cadastrada com sucesso!')
        setNome('')
    }


    return(
        <>
        <Head>
            <title>Nova Categoria - Click Garçom</title>
        </Head>
        <div>
            <Header />
            <main className={styles.container} onSubmit={handleRegisterCategory}>
                <h1>Cadastrar Nova Categoria</h1>

                <form className={styles.form}>
                    <input type="text"
                    placeholder="Digite o nome da Categoria"
                    className={styles.input}
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    />

                    <button className={styles.buttonAdd} type="submit">
                        Cadastrar
                    </button>
                </form>
            </main>
        </div>
        </>
    )
}