import { Router } from "express";
import { BrandController } from "../../controllers/brand.controller";

const router = Router();
const controller = new BrandController();

router.get("/select", controller.select);



export default router;