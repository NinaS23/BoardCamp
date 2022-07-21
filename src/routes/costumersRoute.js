import { Router } from "express";
import {getAllCostumers , getCostumersByID, insertCostumer} from "../controllers/costumersController.js";
import { ValidateCostumers } from "../middlewares/costumersMiddleware.js";

const costumersRouter = Router();

costumersRouter.get("/customers", getAllCostumers);
costumersRouter.get("/costumers:id", getCostumersByID);
costumersRouter.post("/costumers", ValidateCostumers, insertCostumer);

export default costumersRouter;