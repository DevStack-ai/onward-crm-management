import { Router } from "express";
import { ContactController } from "../../controllers/customer/contacts.controller";

const router = Router();
const controller = new ContactController();

router.post('/table', controller.list);
router.put("/:id/default", controller.setDefault);
router.get("/:id", controller.get);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);
router.post("/", controller.create);

export default router;