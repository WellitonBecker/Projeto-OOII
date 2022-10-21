import { Request, Response } from "express";
import { ModelTipoVeiculo } from "../model/ModelTipoVeiculo";

export class ControllerTipoVeiculo {

    async inserir(req: Request, res: Response) {
        const {nome} = req.body;

        const modelTipoVeiculo = new ModelTipoVeiculo();

        const result = await modelTipoVeiculo.inserir({nome});

        return res.status(201).json(result);
    }

    async listar(req: Request, res: Response){
        const modelTipoVeiculo = new ModelTipoVeiculo();

        const result = await modelTipoVeiculo.listar();

        return res.status(201).json(result);
    }

}