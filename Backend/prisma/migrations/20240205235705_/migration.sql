/*
  Warnings:

  - You are about to drop the column `Observacao` on the `pedido` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "itens" ADD COLUMN     "Observacao" TEXT;

-- AlterTable
ALTER TABLE "pedido" DROP COLUMN "Observacao";
