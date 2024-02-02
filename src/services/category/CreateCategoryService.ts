import prismaClient from "../../prisma";

interface CategoryRequest{
  Nome: string;
}

class CreateCategoryService {
  async execute({ Nome }: CategoryRequest) {
    if (Nome === '') {
      throw new Error('Nome não pode ser vazio');
      
    }
    const category = await prismaClient.categoria.create({
      data: {
        Nome: Nome,
      },
      select: {
        Id: true,
        Nome: true,
      }
    })


    return category;
  }
}

export { CreateCategoryService };