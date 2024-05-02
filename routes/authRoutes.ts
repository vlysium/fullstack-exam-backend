import { Router } from "express";
import authController from "../controllers/authController";
import jwtAuth from "../middleware/auth";

const router = Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/user", jwtAuth, authController.getUser);

export default router;