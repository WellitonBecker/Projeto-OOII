import { Router } from "express";
import { ControllerUsuario } from "../controller/ControllerUsuario";

const usuarioRoutes = Router();
const controllerUsuario = new ControllerUsuario();

usuarioRoutes.get("/", controllerUsuario.listar);
usuarioRoutes.post("/", controllerUsuario.inserir);

export { usuarioRoutes };