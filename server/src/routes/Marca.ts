import { Router } from "express";
import { ControllerMarca } from "../controller/ControllerMarca";

const marcaRoutes = Router();
const controllerMarca = new ControllerMarca();

marcaRoutes.get("/", controllerMarca.listar);
marcaRoutes.post("/", controllerMarca.inserir);
marcaRoutes.delete("/:id", controllerMarca.deletar);

export { marcaRoutes };