import { FormEvent, useState, useContext } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../../../styles/home.module.scss'

import logoImg from '../../../public/LogoSemFundo.png'

import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'

import { AuthContext } from '@/src/context/AuthContext';
import Link from 'next/link'
import { toast } from 'react-toastify';



//Tela de Login
export default function Signup() {

  const { signUp } = useContext(AuthContext);

  const [Nome, setNome] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  async function handleSingUp(event: FormEvent) {
    event.preventDefault();

    if (Nome === '' || Email === "" || Password === "") {
      toast.warning('Preencha os dados')
      return
    }

    setLoading(true);

    let data = {
      Nome,
      Email,
      Password,
    }

    signUp(data);
    setLoading(false);

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
              value={Nome}
              onChange={(e) => setNome(e.target.value)}

            />

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
