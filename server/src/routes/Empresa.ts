import { Router } from "express";
import { ControllerEmpresa } from "../controller/ControllerEmpresa";

const empresaRoutes = Router();
const controllerEmpresa = new ControllerEmpresa();

empresaRoutes.get("/", controllerEmpresa.listar);
empresaRoutes.post("/", controllerEmpresa.inserir);
empresaRoutes.delete("/:codigo", controllerEmpresa.deletar);
empresaRoutes.get("/:codigo", controllerEmpresa.visualizar);
empresaRoutes.put("/:codigo", controllerEmpresa.alterar);

export { empresaRoutes };