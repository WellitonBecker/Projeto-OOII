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
        const modelEmpresa = new ModelEmpresa();

        const result = await modelEmpresa.listar();

        return res.status(201).json(result);
    }

}