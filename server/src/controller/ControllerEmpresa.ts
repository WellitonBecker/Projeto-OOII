import { Request, Response } from "express";
import { ModelEmpresa } from "../model/ModelEmpresa";

export class ControllerEmpresa {

    async inserir(req: Request, res: Response) {
        const { email, nome} = req.body;

        const modelEmpresa = new ModelEmpresa();

        const result = await modelEmpresa.inserir({email, nome});

        return res.status(201).json(result);
    }

    async listar(req: Request, res: Response){
        const take         = req.query.take as string;
        const pagina       = req.query.pagina as string;
        const modelEmpresa = new ModelEmpresa();

        const result = await modelEmpresa.listar({ take, pagina });

        return res.status(200).json(result);
    }

    async deletar(req: Request, res: Response) {
        const modelEmpresa = new ModelEmpresa();
        const codigo = req.params.codigo;

        const result = await modelEmpresa.deletar(codigo);
        if(result){
            return res.status(200).json("Registro deletado com sucesso");
        } else {
            return res.status(200).json("Não foi possível excluir o registro");
        }
    }

    async visualizar(req: Request, res: Response) {
        const codigo = req.params.codigo;

        return res.status(200).json(await (new ModelEmpresa()).visualizar(codigo));
    }

}