import { Router } from "express";
import { AdminController } from "../../controllers/admin.controller";

const router = Router();
const controller = new AdminController();

router.post('/table', controller.list);
router.get("/:id", controller.get);
router.post("/:id/reset-password", controller.resetPassword);
router.post("/", controller.create);

export default router;