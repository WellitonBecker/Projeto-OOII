import { Router } from "express";
import { usuarioRoutes } from "./Usuario";

const routes = Router();

routes.use("/usuario", usuarioRoutes);
// routes.use("/movies", movieRoutes);

export { routes };