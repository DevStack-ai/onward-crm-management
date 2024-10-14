import { Router } from "express";
import { AddressController } from "../../controllers/customer/address.controller";

const router = Router();
const controller = new AddressController();

router.get("/types/select", controller.types);
router.post('/table', controller.list);
router.put("/:id/default", controller.setDefault);
router.get("/:id", controller.get);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);
router.post("/", controller.create);

export default router;