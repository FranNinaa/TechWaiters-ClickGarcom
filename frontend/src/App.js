import Nome from './components/Nome';
import { useState } from 'react';

function App() {
  
  return (
    <div>
      <h1>Projeto Click Garçom</h1>
      <h2>Login</h2> <br/>

      

      <img src='./public/logo192.png'></img><br/>

      <input placeholder="Digite seu email"></input><br/>
      <input placeholder="Digite sua senha" type='password'></input><br/>

      <button type='submit'>Acessar</button>
      <p>Registrar minha empresa</p>

    </div>
  );
}



export default App;

