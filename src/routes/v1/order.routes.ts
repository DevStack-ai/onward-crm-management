import { Router } from "express";
import { OrderController } from "../../controllers/store/order.controller";

const router = Router();
const controller = new OrderController();

router.post("/", controller.createOrder);
router.post("/table", controller.listOrders);
router.get("/:id", controller.getOrder);

router.put("/detail/:id", controller.updateOrderDetail);
router.put("/:id", controller.updateOrder);

router.post("/approve", controller.approveOrder);
router.post("/reject", controller.rejectOrder);



export default router;