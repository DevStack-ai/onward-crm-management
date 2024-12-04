import { Router } from "express";
import { ProductController } from "../../controllers/store/products.controller";

const router = Router();
const controller = new ProductController();

router.get('/', controller.getFile);


export default router;