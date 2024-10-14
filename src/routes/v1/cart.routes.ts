import { Router } from "express";
import { CartController } from "../../controllers/store/cart.controller";

const router = Router();
const controller = new CartController();

router.post("/", controller.getCart);
router.post("/add", controller.addCart);
router.post("/update", controller.updateCart);
router.post("/delete", controller.deleteCart);
router.post("/deleteAll", controller.deleteAllCart);
router.post("/count", controller.getCartCount);


export default router;