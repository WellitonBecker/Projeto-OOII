import { Marca, TipoVeiculo } from "@prisma/client";

export interface InterfaceFrota {
    nome: string;
    ano: string;
    codMarca: string;
    codTipoVeiculo: string;
}