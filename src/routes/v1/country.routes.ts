import { Router } from "express";
import { CountryCOntroller } from "../../controllers/country.controller";

const router = Router();
const controller = new CountryCOntroller();

router.get("/select", controller.select);



export default router;