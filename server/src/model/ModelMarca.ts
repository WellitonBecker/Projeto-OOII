import { Marca } from ".prisma/client";
import { AppError } from "../errors/AppError";
import { InterfaceMarca } from "../interface/InterfaceMarca";
import { prisma } from "../prisma/client";

export class ModelMarca {

    async inserir({nome, pais}:InterfaceMarca): Promise<Marca> {
        const emailExiste = await prisma.marca.findUnique({
            where: {
                nome
            }
        });

        if(emailExiste){
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

    async listar(): Promise<Marca[]>{
        const marcas = await prisma.marca.findMany();

        return marcas;
    }
}