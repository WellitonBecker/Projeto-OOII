import { Frota } from ".prisma/client";
import { AppError } from "../errors/AppError";
import { InterfaceFrota } from "../interface/InterfaceFrota";
import { prisma } from "../prisma/client";

export class ModelFrota {

    async inserir({nome, ano, codMarca, codTipoVeiculo}:InterfaceFrota): Promise<Frota> {

        const marca = await prisma.marca.findUnique({
            where: {
                codigo : codMarca
            }
        });

        if(!marca){
            throw new AppError("Marca não existe");
        }

        const tipoVeiculo = await prisma.tipoVeiculo.findUnique({
            where: {
                codigo : codTipoVeiculo
            }
        });

        if(!tipoVeiculo){
            throw new AppError("Tipo de veículo não existe");
        }

        const frota = await prisma.frota.create({
            data:{
                nome, 
                ano,
                codMarca,
                codTipoVeiculo
            }
        })

        return frota;
    }

    async listar(): Promise<Frota[]>{
        const frotas = await prisma.frota.findMany();

        return frotas;
    }
}