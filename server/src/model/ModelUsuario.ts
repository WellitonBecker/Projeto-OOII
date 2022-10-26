import { Usuario } from ".prisma/client";
import { AppError } from "../errors/AppError";
import { InterfaceConsulta } from "../interface/InterfaceConsulta";
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
            throw new AppError("Login já está sendo utilizado");
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

    async listar({ take = '5', pagina = '1'}:InterfaceConsulta): Promise<Usuario[]>{
        take   = take === "" ? '5' : take;
        pagina = pagina === "" ? '1' : pagina;

        const skip = Number(pagina) > 1 ? (Number(pagina)-1) * Number(take) : 0;
        
        const usuarios = await prisma.usuario.findMany({
            take:Number(take),
            skip
        });

        return usuarios;
    }

    async deletar(codigo:string) {
        return await prisma.usuario.delete({
            where: {
                codigo
            }
        });
    }

    async visualizar(codigo:string){
        const usuario = await prisma.usuario.findUnique({
            where:{
                codigo
            }
        });

        if(!usuario){
            throw new AppError(`Usuário com o código '${codigo}' não existe`);
        }
        return usuario;
    }

    async alterar({email, nome, login, senha}:InterfaceUsuario, codigo:string){
        const original = await prisma.usuario.findUnique({
            where:{
                codigo
            }
        });

        const newNome  = nome === "" && original?.nome !== nome ? original?.nome : nome;
        const newEmail = email === "" && original?.email !== email ? original?.email : email;
        const newLogin = login === "" && original?.login !== login ? original?.login : login;
        const newSenha = senha === "" && original?.senha !== senha ? original?.senha : senha;

        return await prisma.usuario.update({
            where:{
                codigo
            },
            data:{
                nome:newNome,
                email:newEmail,
                login:newLogin,
                senha:newSenha
            }
        })
    }

}