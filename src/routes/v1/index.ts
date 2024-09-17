import { Router } from "express";

import auth from "./admin.route";
import state from "./state.routes";

const router = Router();

// router.use("/auth", auth)
// router.use("/admins", auth)

router.use("/states", state)


export default router;