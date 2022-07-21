import { Router } from "express";
import {getAllCostumers , getCostumersByID, insertCostumer, updateCustumerById} from "../controllers/costumersController.js";
import { ValidateCostumers, IDcostumersMiddleware} from "../middlewares/costumersMiddleware.js";

const costumersRouter = Router();

costumersRouter.get("/customers", getAllCostumers);
costumersRouter.get("/customers/:id",IDcostumersMiddleware, getCostumersByID);
costumersRouter.post("/custumers", ValidateCostumers, insertCostumer);
costumersRouter.put("/custumers/:id", ValidateCostumers, updateCustumerById)

export default costumersRouter;