import { TipoVeiculo } from ".prisma/client";
import { AppError } from "../errors/AppError";
import { InterfaceTipoVeiculo } from "../interface/InterfaceTipoVeiculo";
import { prisma } from "../prisma/client";

export class ModelTipoVeiculo {
    
    async inserir({nome}:InterfaceTipoVeiculo): Promise<TipoVeiculo> {
        
        const nomeExiste = await prisma.tipoVeiculo.findUnique({
            where: {
                nome
            }
        });

        if(nomeExiste){
            throw new AppError("Nome já está sendo utilzado");
        }

        

        const tipoVeiculo = await prisma.tipoVeiculo.create({
            data:{
                nome
            }
        })
        
        return tipoVeiculo;
    }

    async listar(): Promise<TipoVeiculo[]>{
        const tipoVeiculos = await prisma.tipoVeiculo.findMany();

        return tipoVeiculos;
    }
    
}