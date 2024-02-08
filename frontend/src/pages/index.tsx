import React, { useContext, FormEvent, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';

import logoImg from '../../public/LogoSemFundo.png'

import styles from '../../styles/home.module.scss'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'

import {AuthContext} from '../context/AuthContext'

import Link from 'next/link'



//Tela de Login
export default function Home() {
  const {signIn} = useContext(AuthContext)

  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)
  

  async function handleLogin(event:FormEvent){
    event.preventDefault()
    
    let data ={
      Email,
      Password
    }
    await signIn(data)
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
              loading={false}
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
