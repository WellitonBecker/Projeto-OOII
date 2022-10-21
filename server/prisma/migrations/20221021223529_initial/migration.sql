-- CreateTable
CREATE TABLE "usuarios" (
    "codigo" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "login" INTEGER NOT NULL,
    "senha" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "empresas" (
    "codigo" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "usuario_empresa" (
    "sequencia" TEXT NOT NULL PRIMARY KEY,
    "codUsuario" TEXT NOT NULL,
    "codEmpresa" TEXT NOT NULL,
    CONSTRAINT "usuario_empresa_codUsuario_fkey" FOREIGN KEY ("codUsuario") REFERENCES "usuarios" ("codigo") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "usuario_empresa_codEmpresa_fkey" FOREIGN KEY ("codEmpresa") REFERENCES "empresas" ("codigo") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "tipos_veiculos" (
    "codigo" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "marcas" (
    "codigo" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "pais" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "frotas" (
    "codigo" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "ano" TEXT NOT NULL,
    "codMarca" TEXT NOT NULL,
    "codTipoVeiculo" TEXT NOT NULL,
    CONSTRAINT "frotas_codMarca_fkey" FOREIGN KEY ("codMarca") REFERENCES "marcas" ("codigo") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "frotas_codTipoVeiculo_fkey" FOREIGN KEY ("codTipoVeiculo") REFERENCES "tipos_veiculos" ("codigo") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "frotas_empresa" (
    "codEmpresa" TEXT NOT NULL,
    "codFrota" TEXT NOT NULL,
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
