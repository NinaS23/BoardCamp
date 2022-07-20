import { Router } from "express";

import { getAllCategories, insertCategory } from "../controllers/categoriesController.js";
import { insertCategoryMiddlaware } from "../middlewares/categoriesMiddleware.js";

const categoriesRouter = Router();

categoriesRouter.get('/categories', getAllCategories);
categoriesRouter.post('/categories',insertCategoryMiddlaware, insertCategory);

export default categoriesRouter;