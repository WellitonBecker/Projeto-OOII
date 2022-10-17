import { Usuario } from ".prisma/client";
import { AppError } from "../errors/AppError";
import { InterfaceUsuario } from "../interface/InterfaceUsuario";
import { prisma } from "../prisma/client";

export class ModelUsuario {

    async inserir({email, nome, login, senha}:InterfaceUsuario): Promise<Usuario> {
        const emailExiste = await prisma.usuario.findUnique({
            where: {
                email
            }
        });

        if(emailExiste){
            throw new AppError("E-mail já está sendo utilzado");
        }

        const loginExiste = await prisma.usuario.findUnique({
            where: {
                login
            }
        });

        if(loginExiste){
            throw new AppError("Login já está sendo utilzado");
        }

        const usuario = await prisma.usuario.create({
            data:{
                email,
                nome,
                login,
                senha
            }
        })

        return usuario;
    }

    async listar(): Promise<Usuario[]>{
        const usuarios = await prisma.usuario.findMany();

        return usuarios;
    }
}