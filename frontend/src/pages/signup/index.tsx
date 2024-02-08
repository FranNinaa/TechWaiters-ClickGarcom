import { FormEvent, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../../../styles/home.module.scss'

import logoImg from '../../../public/LogoSemFundo.png'

import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'

import Link from 'next/link'



//Tela de Login
export default function Signup() {

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  async function handleSingUp(event: FormEvent) {
    event.preventDefault();

    if(nome === '' || email === "" || password === ""){
      alert('Preencha os dados');
      return;
    }

    setLoading(true);

  }


  return (
    <>
      <Head>
        <title>Click Garçom - Faça Seu Cadastro</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Click Garçom" />

        <div className={styles.login}>
          <h1>
            Criando sua Conta
          </h1>
          <form onSubmit={handleSingUp}>
            <Input
              placeholder='Digite seu nome'
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}

            />

            <Input
              placeholder='Digite seu e-mail'
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              placeholder='Digite sua senha'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              loading={loading}
            >
              Cadastrar
            </Button>

          </form>

          <Link href="/" className={styles.text}>
            Já Posui uma conta? Acesse!
          </Link>

        </div>
      </div>
    </>
  );
}
