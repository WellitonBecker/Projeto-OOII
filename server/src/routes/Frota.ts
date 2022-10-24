import { Router } from "express";
import { ControllerFrota } from "../controller/ControllerFrota";

const frotaRoutes = Router();
const controllerFrota = new ControllerFrota();

frotaRoutes.get("/", controllerFrota.listar);
frotaRoutes.post("/", controllerFrota.inserir);

export { frotaRoutes };