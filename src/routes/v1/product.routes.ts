import { Router } from "express";
import { ProductController } from "../../controllers/store/products.controller";

const router = Router();
const controller = new ProductController();

router.post('/load-file', controller.loadFile);
router.post('/export', controller.export);
router.post('/image', controller.getImage);
router.post('/create', controller.create);
router.post("/:id/activate", controller.activate);
router.put('/:id', controller.update);
router.get('/:id', controller.get);
router.delete('/:id', controller.delete);
router.post("/table", controller.table);
router.post('/', controller.list);

export default router;