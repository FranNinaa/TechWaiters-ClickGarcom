// Importa a função de configuração do cliente API do arquivo api.js
import { setupAPIClient } from "./api"; 

// Cria e exporta uma instância do cliente API configurado para uso global na aplicação
// Isso permite que o mesmo conjunto de configurações do Axios seja reutilizado em diferentes partes do projeto,
// incluindo a inclusão automática de tokens de autenticação (se presentes nos cookies) e a configuração base da URL da API.
export const api = setupAPIClient();
