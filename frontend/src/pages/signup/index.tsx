import Head from 'next/head';
import Image from 'next/image';
import styles from '../../../styles/home.module.scss'

import logoImg from '../../../public/LogoSemFundo.png'

import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'

import Link from 'next/link'



//Tela de Login
export default function Signup() {
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
          <form>
          <Input
              placeholder='Digite seu nome'
              type="text"
            />

            <Input
              placeholder='Digite seu e-mail'
              type="text"
            />

            <Input
              placeholder='Digite sua senha'
              type="password"
            />

            <Button
              type="submit"
              loading={false}
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
