import { TipoVeiculo } from ".prisma/client";
import { AppError } from "../errors/AppError";
import { InterfaceConsulta } from "../interface/InterfaceConsulta";
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

    async listar({ take = '5', pagina = '1'}:InterfaceConsulta): Promise<TipoVeiculo[]>{
        take   = take === "" ? '5' : take;
        pagina = pagina === "" ? '1' : pagina;

        const skip = Number(pagina) > 1 ? (Number(pagina)-1) * Number(take) : 0;
        
        const tipoVeiculos = await prisma.tipoVeiculo.findMany({
            take:Number(take),
            skip
        });

        return tipoVeiculos;
    }
    
    async deletar(codigo:string) {
        return await prisma.tipoVeiculo.delete({
            where: {
                codigo
            }
        });
    }

    async visualizar(codigo:string){
        const tipoVeiculo = await prisma.tipoVeiculo.findUnique({
            where:{
                codigo
            }
        });

        if(!tipoVeiculo){
            throw new AppError(`Tipo de veículo com o código '${codigo}' não existe`);
        }
        return tipoVeiculo;
    }

    async alterar({nome}:InterfaceTipoVeiculo, codigo:string){
        return await prisma.tipoVeiculo.update({
            where:{
                codigo
            },
            data:{
                nome
            }
        })
    }
    
}