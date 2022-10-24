import { Request, Response } from "express";
import { ModelFrota } from "../model/ModelFrota";

export class ControllerFrota {

    async inserir(req: Request, res: Response) {
        const {nome, ano, codTipoVeiculo, codMarca} = req.body;

        const modelFrota = new ModelFrota();

        const result = await modelFrota.inserir({nome, ano, codMarca, codTipoVeiculo});

        return res.status(201).json(result);
    }

    async listar(req: Request, res: Response){
        const modelFrota = new ModelFrota();

        const result = await modelFrota.listar();

        return res.status(201).json(result);
    }

}