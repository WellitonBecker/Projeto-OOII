/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `tipos_veiculos` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "tipos_veiculos_nome_key" ON "tipos_veiculos"("nome");
