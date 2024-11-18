import { Router } from "express";
import { ProductController } from "../../controllers/store/products.controller";

const router = Router();
const controller = new ProductController();

router.post('/create', controller.create);
router.post("/table", controller.table);
router.post('/', controller.list);

export default router;