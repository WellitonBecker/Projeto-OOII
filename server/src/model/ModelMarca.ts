import { Marca } from ".prisma/client";
import { AppError } from "../errors/AppError";
import { InterfaceConsulta } from "../interface/InterfaceConsulta";
import { InterfaceMarca } from "../interface/InterfaceMarca";
import { prisma } from "../prisma/client";

export class ModelMarca {

    async inserir({nome, pais}:InterfaceMarca): Promise<Marca> {
        const nomeExiste = await prisma.marca.findUnique({
            where: {
                nome
            }
        });

        if(nomeExiste){
            throw new AppError("Nome já está sendo utilzado");
        }

        const marca = await prisma.marca.create({
            data:{
                nome,
                pais
            }
        })

        return marca;
    }

    async listar({ take = '5', pagina = '1'}:InterfaceConsulta): Promise<Marca[]>{
        take   = take === "" ? '5' : take;
        pagina = pagina === "" ? '1' : pagina;

        const skip = Number(pagina) > 1 ? (Number(pagina)-1) * Number(take) : 0;
        
        const marcas = await prisma.marca.findMany({
            take:Number(take),
            skip
        });

        return marcas;
    }

    async deletar(codigo:string) {
        return await prisma.marca.delete({
            where: {
                codigo
            }
        });
    }

    async visualizar(codigo:string){
        const marca = await prisma.marca.findUnique({
            where:{
                codigo
            }
        });

        if(!marca){
            throw new AppError(`Marca com o código '${codigo}' não existe`);
        }
        return marca;
    }
    
    async alterar({nome, pais}:InterfaceMarca, codigo:string){
        const original = await prisma.marca.findUnique({
            where:{
                codigo
            }
        });

        const newNome  = nome === "" && original?.nome !== nome ? original?.nome : nome;
        const newPais = pais === "" && original?.pais !== pais ? original?.pais : pais;

        return await prisma.marca.update({
            where:{
                codigo
            },
            data:{
                nome:newNome,
                pais:newPais
            }
        })
    }
    
}