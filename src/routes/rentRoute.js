import { Router } from "express";
import { getRents, insertRent } from "../controllers/rentController.js";
import { insertRentMiddleware } from "../middlewares/rentMiddleware.js";

const rentRouter = Router();

rentRouter.get("/rentals", getRents)
rentRouter.post("/rentals", insertRentMiddleware, insertRent)

export default rentRouter;
