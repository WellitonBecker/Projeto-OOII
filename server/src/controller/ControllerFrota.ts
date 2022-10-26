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
        const take       = req.query.take as string;
        const pagina     = req.query.pagina as string;
        const modelFrota = new ModelFrota();

        const result = await modelFrota.listar({ take, pagina });

        return res.status(200).json(result);
    }
    
    async deletar(req: Request, res: Response) {
        const modelFrota = new ModelFrota();
        const codigo = req.params.codigo;

        const result = await modelFrota.deletar(codigo);
        if(result){
            return res.status(200).json("Registro deletado com sucesso");
        } else {
            return res.status(200).json("Não foi possível excluir o registro");
        }
    }
    
    async visualizar(req: Request, res: Response) {
        const modelFrota = new ModelFrota();
        const codigo = req.params.codigo;

        return res.status(200).json(await modelFrota.visualizar(codigo));
    }

}