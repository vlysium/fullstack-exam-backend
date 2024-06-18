import { Router } from "express";
import authController from "../controllers/authController";
import { adminAuth, jwtAuth } from "../middleware/auth";

const router = Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/user", jwtAuth, authController.getUser); // route for users to get their own info
// router.delete("/user/:id", jwtAuth, adminAuth, authController.deleteUser); // route for admins to ban/delete a user

export default router;