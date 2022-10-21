import { Router } from "express";
import { ControllerEmpresa } from "../controller/ControllerEmpresa";

const empresaRoutes = Router();
const controllerEmpresa = new ControllerEmpresa();

empresaRoutes.get("/", controllerEmpresa.listar);
empresaRoutes.post("/", controllerEmpresa.inserir);

export { empresaRoutes };