-- CreateTable
CREATE TABLE "usuario" (
    "Id" TEXT NOT NULL,
    "Nome" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "categoria" (
    "Id" TEXT NOT NULL,
    "Nome" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categoria_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "produto" (
    "Id" TEXT NOT NULL,
    "Nome" TEXT NOT NULL,
    "Descricao" TEXT NOT NULL,
    "Preco" TEXT NOT NULL,
    "Banner" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "categoria_id" TEXT NOT NULL,

    CONSTRAINT "produto_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "pedido" (
    "Id" TEXT NOT NULL,
    "Mesa" INTEGER NOT NULL,
    "Status" BOOLEAN NOT NULL DEFAULT false,
    "Rascunho" BOOLEAN NOT NULL DEFAULT true,
    "Nome" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pedido_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "itens" (
    "Id" TEXT NOT NULL,
    "Quantidade" INTEGER NOT NULL,
    "Observacao" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pedido_id" TEXT NOT NULL,
    "produto_id" TEXT NOT NULL,

    CONSTRAINT "itens_pkey" PRIMARY KEY ("Id")
);

-- AddForeignKey
ALTER TABLE "produto" ADD CONSTRAINT "produto_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "categoria"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itens" ADD CONSTRAINT "itens_pedido_id_fkey" FOREIGN KEY ("pedido_id") REFERENCES "pedido"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itens" ADD CONSTRAINT "itens_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produto"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
