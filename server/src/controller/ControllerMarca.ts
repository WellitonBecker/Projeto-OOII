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
        const modelMarca = new ModelMarca();

        const result = await modelMarca.listar();

        return res.status(201).json(result);
    }

    async deletar(req: Request, res: Response) {
        const modelMarca = new ModelMarca();
        const codigo = req.params.codigo;

        const result = await modelMarca.deletar(codigo);
        if(result){
            return res.status(200).send("Registro deletado com sucesso");
        } else {
            return res.status(200).send("Não foi possível excluir o registro");
        }
    }

}