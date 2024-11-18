import { Router } from "express";
import { CategoryController } from "../../controllers/art_category.controller";

const router = Router();
const controller = new CategoryController();

router.get("/select", controller.select);



export default router;