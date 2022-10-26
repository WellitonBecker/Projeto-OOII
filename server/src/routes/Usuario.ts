import { Router } from "express";
import { ControllerUsuario } from "../controller/ControllerUsuario";

const usuarioRoutes = Router();
const controllerUsuario = new ControllerUsuario();

usuarioRoutes.get("/", controllerUsuario.listar);
usuarioRoutes.post("/", controllerUsuario.inserir);
usuarioRoutes.delete("/:codigo", controllerUsuario.deletar);
usuarioRoutes.get("/:codigo", controllerUsuario.visualizar);

export { usuarioRoutes };