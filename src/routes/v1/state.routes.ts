import { Router } from "express";
import { StatesController } from "../../controllers/system/states.controlle";

const router = Router();
const controller = new StatesController();

router.get("/select", controller.getStates);

export default router;