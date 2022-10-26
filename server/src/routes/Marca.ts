import { Router } from "express";
import { ControllerMarca } from "../controller/ControllerMarca";

const marcaRoutes = Router();
const controllerMarca = new ControllerMarca();

marcaRoutes.get("/", controllerMarca.listar);
marcaRoutes.post("/", controllerMarca.inserir);
marcaRoutes.delete("/:codigo", controllerMarca.deletar);
marcaRoutes.get("/:codigo", controllerMarca.visualizar);

export { marcaRoutes };