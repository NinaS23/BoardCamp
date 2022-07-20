import { Router } from "express"
import { getGames, insertGame } from "../controllers/gamesController.js";
import gamesMiddleware from "../middlewares/gamesMiddleware.js";

const gamesRouter = Router()

gamesRouter.get("/games", getGames)
gamesRouter.post("/games",gamesMiddleware, insertGame)

export default gamesRouter;