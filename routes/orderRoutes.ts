import { Router } from "express";
import orderController from "../controllers/orderController";
import { jwtAuth } from "../middleware/auth";

const router = Router();

router.post("/order", jwtAuth, orderController.createOrder);

export default router;