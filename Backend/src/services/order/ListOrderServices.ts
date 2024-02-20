import prismaClient from "../../prisma";

// Declara a classe ListOrderServices, que encapsula a lógica para listar pedidos sob certas condições.
class ListOrderServices {
  async execute() {
    // Utiliza o Prisma Client para buscar todos os pedidos no banco de dados
    // que não são rascunhos e cujo status é false (não concluídos).
    const pedidos = await prismaClient.pedido.findMany({
        where: {
            Rascunho: false, 
            Status: false   
        },
        orderBy: {
            created_at: 'desc' // Ordena os pedidos pela data de criação de forma decrescente.
        }
    })
   
    return pedidos;   
  }
}


export { ListOrderServices };
