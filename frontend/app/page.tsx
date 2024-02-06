//import Head from 'next/head';
import Image from 'next/image'

import logoImg from '../public/LogoSemFundo.png';
import styles from './../styles/home.module.scss';
import {Input} from './components/ui/input';
import {Button} from './components/ui/button';

//Tela de Login
 
export default function Home() {
  return (
    <>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Click Garcom" />
        
        <div className={styles.login}>
          <form>
            <Input placeholder='Digite seu email' type='text'/> <br/>
            <Input placeholder='Digite sua senha' type='password' /> <br/>
            
            <Button type="submit" loading={false}>Entrar</Button>
          </form>

          <a className={styles.text}>Não possui uma conta? Cadastre-se</a>
        </div>
      </div>
    </>

  );
}
