import { Router } from "express";

import auth from "./admin.route";


const router = Router();

router.use("/auth", auth)
router.use("/admins", auth)


export default router;