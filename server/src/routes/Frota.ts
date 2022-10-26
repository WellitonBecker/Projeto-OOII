import { Router } from "express";
import { ControllerFrota } from "../controller/ControllerFrota";

const frotaRoutes = Router();
const controllerFrota = new ControllerFrota();

frotaRoutes.get("/", controllerFrota.listar);
frotaRoutes.post("/", controllerFrota.inserir);
frotaRoutes.delete("/:codigo", controllerFrota.deletar);
frotaRoutes.get("/:codigo", controllerFrota.visualizar);
frotaRoutes.put("/:codigo", controllerFrota.alterar);

export { frotaRoutes };