import { Router } from "express";
import { usuarioRoutes } from "./Usuario";
import { empresaRoutes } from "./Empresa";
import { tipoVeiculoRoutes } from "./TipoVeiculo";
import { marcaRoutes } from "./Marca";
import { frotaRoutes } from "./Frota";

const routes = Router();

routes.use("/usuario", usuarioRoutes);
routes.use("/empresa", empresaRoutes);
routes.use("/tipoveiculo", tipoVeiculoRoutes);
routes.use("/marca", marcaRoutes);
routes.use("/frota", frotaRoutes);

export { routes };