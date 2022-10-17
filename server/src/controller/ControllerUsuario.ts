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
        const modelUsuario = new ModelUsuario();

        const result = await modelUsuario.listar();

        return res.status(201).json(result);
    }

}