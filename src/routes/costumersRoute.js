import { Router } from "express";
import {getAllCostumers , getCostumersByID, insertCostumer} from "../controllers/costumersController.js";
import { ValidateCostumers, IDcostumersMiddleware} from "../middlewares/costumersMiddleware.js";

const costumersRouter = Router();

costumersRouter.get("/customers", getAllCostumers);
costumersRouter.get("/customers/:id",IDcostumersMiddleware, getCostumersByID);
costumersRouter.post("/costumers", ValidateCostumers, insertCostumer);

export default costumersRouter;