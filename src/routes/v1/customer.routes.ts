import { Router } from "express";
import { CustomerController } from "../../controllers/customer/shp_customer.controller";

const router = Router();
const controller = new CustomerController();

router.post('/table', controller.list);
router.post("/:id/approve", controller.approve);
router.get("/:id", controller.get);
router.post("/", controller.create);

export default router;