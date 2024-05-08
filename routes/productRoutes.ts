import { Router } from "express";
import productController from "../controllers/productController";

const router = Router();

router.get("/products", productController.getProducts);
router.get("/products/:slug", productController.getProductBySlug);

export default router;