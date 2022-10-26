import { Request, Response } from "express";
import { ModelMarca } from "../model/ModelMarca";

export class ControllerMarca {

    async inserir(req: Request, res: Response) {
        const {nome, pais} = req.body;

        const modelMarca = new ModelMarca();

        const result = await modelMarca.inserir({nome, pais});

        return res.status(201).json(result);
    }

    async listar(req: Request, res: Response){
        const take       = req.query.take as string;
        const pagina     = req.query.pagina as string;
        const modelMarca = new ModelMarca();

        const result = await modelMarca.listar({ take, pagina });

        return res.status(200).json(result);
    }

    async deletar(req: Request, res: Response) {
        const modelMarca = new ModelMarca();
        const codigo = req.params.codigo;

        const result = await modelMarca.deletar(codigo);
        if(result){
            return res.status(200).json("Registro deletado com sucesso");
        } else {
            return res.status(200).json("Não foi possível excluir o registro");
        }
    }

    async visualizar(req: Request, res: Response) {
        const modelMarca = new ModelMarca();
        const codigo = req.params.codigo;

        return res.status(200).json(await modelMarca.visualizar(codigo));
    }
}