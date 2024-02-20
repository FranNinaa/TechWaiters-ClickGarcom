
// Importações necessárias de React, Next.js e outras bibliotecas/utilitários
import React, { useContext, FormEvent, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';

import logoImg from '../../public/LogoSemFundo.png'

import styles from '../../styles/home.module.scss'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'

import { AuthContext } from '../context/AuthContext'

import Link from 'next/link'
import { toast } from 'react-toastify';
import { canSSRGuest } from '../utils/canSSRGuest';



// Componente funcional da página de login
export default function Home() {
  const { signIn } = useContext(AuthContext)

 // Estados para gerenciar os inputs do formulário e o estado de carregamento
  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

 // Função para lidar com o evento de submissão do formulário de login
  async function handleLogin(event: FormEvent) {
    event.preventDefault()

    if (Email === "" || Password === "") {
      toast.warning("Preencha os Dados");
      return;
    }

    setLoading(true);

    let data = {
      Email,
      Password
    }

    await signIn(data);

    setLoading(false);


  }

  return (
    <>
      <Head>
        <title>Click Garçom - Faça Seu Login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Click Garçom" />

        <div className={styles.login}>

          <form onSubmit={handleLogin}>
            <Input
              placeholder='Digite seu e-mail'
              type="text"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              placeholder='Digite sua senha'
              type="password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              loading={loading}
            >
              Acessar
            </Button>

          </form>

          <Link href="/signup" className={styles.text}>
            Não possui uma conta? Cadastre-se!
          </Link>

        </div>
      </div>
    </>
  );
}
// Função getServerSideProps para verificação de convidado com SSR
export const getServerSideProps = canSSRGuest(async (ctx) => {
   // Retorna props vazias, necessário para a função SSR
  return {
    props: {}
  }
})