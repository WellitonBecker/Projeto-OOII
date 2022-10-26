import { Request, Response } from "express";
import { ModelUsuario } from "../model/ModelUsuario";

export class ControllerUsuario {

    async inserir(req: Request, res: Response) {
        const { email, nome, login, senha} = req.body;

        const modelUsuario = new ModelUsuario();

        const result = await modelUsuario.inserir({email, nome, login, senha});

        return res.status(201).json(result);
    }

    async listar(req: Request, res: Response){
        const take         = req.query.take as string;
        const pagina       = req.query.pagina as string;
        const modelUsuario = new ModelUsuario();

        const result = await modelUsuario.listar({ take, pagina });

        return res.status(200).json(result);
    }
    
    async deletar(req: Request, res: Response) {
        const modelUsuario = new ModelUsuario();
        const codigo = req.params.codigo;

        const result = await modelUsuario.deletar(codigo);
        if(result){
            return res.status(200).json("Registro deletado com sucesso");
        } else {
            return res.status(200).json("Não foi possível excluir o registro");
        }
    }

    async visualizar(req: Request, res: Response) {
        const modelUsuario = new ModelUsuario();
        const codigo = req.params.codigo;

        return res.status(200).json(await modelUsuario.visualizar(codigo));
    }

}