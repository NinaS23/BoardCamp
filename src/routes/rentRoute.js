import { Router } from "express";
import { getRents, insertRent, closeRent, deleteRent } from "../controllers/rentController.js";
import { insertRentMiddleware, deleteAndPostMiddleware } from "../middlewares/rentMiddleware.js";

const rentRouter = Router();


rentRouter.get("/rentals", getRents)
rentRouter.post("/rentals", insertRentMiddleware, insertRent)
rentRouter.post("/rentals/:id/return", deleteAndPostMiddleware, closeRent)
rentRouter.delete("/rentals/:id", deleteAndPostMiddleware, deleteRent)

export default rentRouter;
