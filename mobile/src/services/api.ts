import axios from "axios";

// Cria uma instância do Axios com uma base URL para fazer requisições à API
const api = axios.create({
    // Aqui deve ser inserido o endereço IP da máquina onde o servidor da API está sendo executado
    // Isso permite que o aplicativo faça solicitações para o servidor localmente
    baseURL: "http://192.168.5.103:5000" // Substitua os 'x' pelo endereço IP da sua máquina
})

export { api };
