import { Router } from "express";
import { CountryCOntroller } from "../../controllers/currency.controller";

const router = Router();
const controller = new CountryCOntroller();

router.get("/select", controller.select);



export default router;