import { Router } from "express";
import { getRents } from "../controllers/rentController.js";

const rentRouter = Router();

rentRouter.get("/rentals", getRents)

export default rentRouter;
