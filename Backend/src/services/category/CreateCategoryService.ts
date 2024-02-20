import prismaClient from "../../prisma";

// Define uma interface para tipar o parâmetro esperado pelo método execute.
// Isso ajuda a garantir que o serviço seja chamado com os dados corretos.
interface CategoryRequest{
  Nome: string;
}

// Declara a classe CreateCategoryService, que encapsula a lógica para criação de categorias.
class CreateCategoryService {
  async execute({ Nome }: CategoryRequest) {
    if (Nome === '') {
      throw new Error('Nome não pode ser vazio');
    }

    // Utiliza o Prisma Client para criar uma nova categoria no banco de dados com o nome fornecido.
    // A cláusula select especifica que apenas o Id e o Nome da categoria criada devem ser retornados.
    const categoria = await prismaClient.categoria.create({
      data: {
        Nome: Nome,
      },
      select: {
        Id: true,
        Nome: true,
      }
    })

    return categoria;
  }
}

export { CreateCategoryService };
