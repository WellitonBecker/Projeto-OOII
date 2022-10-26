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
        const take             = req.query.take as string;
        const pagina           = req.query.pagina as string;
        const modelTipoVeiculo = new ModelTipoVeiculo();

        const result = await modelTipoVeiculo.listar({ take, pagina });

        return res.status(200).json(result);
    }

    async deletar(req: Request, res: Response) {
        const modelTipoVeiculo = new ModelTipoVeiculo();
        const codigo = req.params.codigo;

        const result = await modelTipoVeiculo.deletar(codigo);
        if(result){
            return res.status(200).json("Registro deletado com sucesso");
        } else {
            return res.status(200).json("Não foi possível excluir o registro");
        }
    }

    async visualizar(req: Request, res: Response) {
        const modelTipoVeiculo = new ModelTipoVeiculo();
        const codigo = req.params.codigo;

        return res.status(200).json(await modelTipoVeiculo.visualizar(codigo));
    }
    
}