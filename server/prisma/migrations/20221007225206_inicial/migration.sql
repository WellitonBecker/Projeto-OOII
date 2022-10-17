/*
  Warnings:

  - You are about to drop the `movie_rent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `movies` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "movie_rent";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "movies";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "users";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "usuarios" (
    "codigo" BIGINT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "login" INTEGER NOT NULL,
    "senha" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "empresas" (
    "codigo" BIGINT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "usuario_empresa" (
    "sequencia" BIGINT NOT NULL PRIMARY KEY,
    "codUsuario" BIGINT NOT NULL,
    "codEmpresa" BIGINT NOT NULL,
    CONSTRAINT "usuario_empresa_codUsuario_fkey" FOREIGN KEY ("codUsuario") REFERENCES "usuarios" ("codigo") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "usuario_empresa_codEmpresa_fkey" FOREIGN KEY ("codEmpresa") REFERENCES "empresas" ("codigo") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "tipos_veiculos" (
    "codigo" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "marcas" (
    "codigo" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "pais" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "frotas" (
    "codigo" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "ano" INTEGER NOT NULL,
    "codMarca" INTEGER NOT NULL,
    "codTipoVeiculo" INTEGER NOT NULL,
    CONSTRAINT "frotas_codMarca_fkey" FOREIGN KEY ("codMarca") REFERENCES "marcas" ("codigo") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "frotas_codTipoVeiculo_fkey" FOREIGN KEY ("codTipoVeiculo") REFERENCES "tipos_veiculos" ("codigo") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "frotas_empresa" (
    "codEmpresa" BIGINT NOT NULL,
    "codFrota" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,

    PRIMARY KEY ("codEmpresa", "codFrota"),
    CONSTRAINT "frotas_empresa_codEmpresa_fkey" FOREIGN KEY ("codEmpresa") REFERENCES "empresas" ("codigo") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "frotas_empresa_codFrota_fkey" FOREIGN KEY ("codFrota") REFERENCES "frotas" ("codigo") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_login_key" ON "usuarios"("login");

-- CreateIndex
CREATE UNIQUE INDEX "empresas_email_key" ON "empresas"("email");

-- CreateIndex
CREATE UNIQUE INDEX "marcas_nome_key" ON "marcas"("nome");
