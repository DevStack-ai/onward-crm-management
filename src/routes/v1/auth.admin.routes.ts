import { Router } from "express";
import { AuthController } from "../../controllers/customer/shp_auth.controller";

const router = Router();
const controller = new AuthController();

router.post("/login", controller.login);
router.post("/verify_token", controller.verify);

export default router;