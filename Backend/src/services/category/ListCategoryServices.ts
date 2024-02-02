import prismaClient from "../../prisma";

class ListCategoryServices {
  async execute() {
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