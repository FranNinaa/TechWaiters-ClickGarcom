import prismaClient from "../../prisma";

// Declara a classe ListCategoryServices, que contém a lógica para listar categorias.
class ListCategoryServices {
  async execute() {

    // Utiliza o Prisma Client para buscar todas as categorias no banco de dados.
    // A cláusula select define que apenas os campos Id e Nome serão retornados na consulta, 
    // otimizando a resposta ao excluir dados desnecessários.
    const category = await prismaClient.categoria.findMany({
      select:{
        Id: true,
        Nome: true,
      }
    })

    return category;
  }
}


export { ListCategoryServices };
