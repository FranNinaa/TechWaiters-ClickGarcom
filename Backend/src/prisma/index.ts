// Importa o PrismaClient do pacote '@prisma/client'.
// O Prisma Client é gerado automaticamente com base no seu esquema Prisma e contém métodos para acessar o banco de dados.
import { PrismaClient } from "@prisma/client";

// Cria uma nova instância do PrismaClient.
// Esta instância será usada para realizar as operações de banco de dados o CRUD em toda a aplicação.
const prismaClient = new PrismaClient();

// Exporta a instância do PrismaClient.
// Isso permite que o mesmo cliente seja reutilizado em diferentes partes da aplicação, promovendo a eficiência na conexão com o banco de dados.
export default prismaClient;
