import { Router } from "express";
import getAllCostumers from "../controllers/costumersController.js";


const costumersRouter = Router()

costumersRouter.get("/customers", getAllCostumers)

export default costumersRouter;