import { Empresa } from ".prisma/client";
import { AppError } from "../errors/AppError";
import { InterfaceConsulta } from "../interface/InterfaceConsulta";
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

    async listar({ take = '5', pagina = '1'}:InterfaceConsulta): Promise<Empresa[]>{
        take   = take === "" ? '5' : take;
        pagina = pagina === "" ? '1' : pagina;

        const skip = Number(pagina) > 1 ? (Number(pagina)-1) * Number(take) : 0;
        
        const empresas = await prisma.empresa.findMany({
            take:Number(take),
            skip
        });

        return empresas;
    }
    
    async deletar(codigo:string) {
        return await prisma.empresa.delete({
            where: {
                codigo
            }
        });
    }

    async visualizar(codigo:string){
        const empresa = await prisma.empresa.findUnique({
            where:{
                codigo
            }
        });

        if(!empresa){
            throw new AppError(`Empresa com o código '${codigo}' não existe`);
        }
        return empresa;
    }
            
    async alterar({email, nome}:InterfaceEmpresa, codigo:string){
        const original = await prisma.empresa.findUnique({
            where:{
                codigo
            }
        });

        const newNome  = nome === "" && original?.nome !== nome ? original?.nome : nome;
        const newEmail = email === "" && original?.email !== email ? original?.email : email;

        return await prisma.empresa.update({
            where:{
                codigo
            },
            data:{
                nome:newNome,
                email:newEmail
            }
        })
    }

}