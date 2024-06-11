import { Router } from "express";
import categoryController from "../controllers/categoryController";

const router = Router();

router.get("/cuisines", categoryController.getCuisines);
router.get("/menus", categoryController.getMenus);

export default router;