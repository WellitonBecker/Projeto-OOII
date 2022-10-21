import { Empresa } from ".prisma/client";
import { AppError } from "../errors/AppError";
import { InterfaceEmpresa } from "../interface/InterfaceEmpresa";
import { prisma } from "../prisma/client";

export class ModelEmpresa {

    async inserir({email, nome}:InterfaceEmpresa): Promise<Empresa> {
        const emailExiste = await prisma.empresa.findUnique({
            where: {
                email
            }
        });

        if(emailExiste){
            throw new AppError("E-mail já está sendo utilzado");
        }

        const empresa = await prisma.empresa.create({
            data:{
                email,
                nome
            }
        })

        return empresa;
    }

    async listar(): Promise<Empresa[]>{
        const empresas = await prisma.empresa.findMany();

        return empresas;
    }
}