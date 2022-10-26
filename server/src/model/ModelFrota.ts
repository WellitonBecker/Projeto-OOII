import { Frota } from ".prisma/client";
import { AppError } from "../errors/AppError";
import { InterfaceConsulta } from "../interface/InterfaceConsulta";
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

    async listar({ take = '5', pagina = '1'}:InterfaceConsulta): Promise<Frota[]>{
        take   = take === "" ? '5' : take;
        pagina = pagina === "" ? '1' : pagina;

        const skip = Number(pagina) > 1 ? (Number(pagina)-1) * Number(take) : 0;
        
        const frotas = await prisma.frota.findMany({
            take:Number(take),
            skip
        });

        return frotas;
    }

    async deletar(codigo:string) {
        return await prisma.frota.delete({
            where: {
                codigo
            }
        });
    }

    async visualizar(codigo:string){
        const frota = await prisma.frota.findUnique({
            where:{
                codigo
            }
        });

        if(!frota){
            throw new AppError(`Frota com o código '${codigo}' não existe`);
        }
        return frota;
    }

}