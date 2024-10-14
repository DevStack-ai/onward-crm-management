import { Router } from "express";
import { ProductController } from "../../controllers/store/products.controller";

const router = Router();
const controller = new ProductController();

router.post('/', controller.list);

export default router;