import { Router } from "express";
import { ControllerTipoVeiculo } from "../controller/ControllerTipoVeiculo";

const tipoVeiculoRoutes = Router();
const controllerTipoVeiculo = new ControllerTipoVeiculo();

tipoVeiculoRoutes.get("/", controllerTipoVeiculo.listar);
tipoVeiculoRoutes.post("/", controllerTipoVeiculo.inserir);

export { tipoVeiculoRoutes };