import axios from "axios";

const api = axios.create({
    //colocar o ip da sua maquina aqui para poder rodar o projeto
    baseURL: "http://192.168.1.11:5000"
})

export { api };