import { Router } from "express";

import state from "./state.routes";
import customers from "./customer.routes";
import auth from "./auth.admin.routes";
import contacts from "./contact.routes";
import address from "./address.routes";
import products from "./product.routes";
import cart from "./cart.routes";
import order from "./order.routes";

const router = Router();


router.use("/store/products", products)
router.use("/store/cart", cart)
router.use("/store/order", order)

router.use("/orders", order)
router.use("/auth", auth)
router.use("/customers", customers)
router.use("/states", state)
router.use("/contacts", contacts)
router.use("/addresses", address)



export default router;