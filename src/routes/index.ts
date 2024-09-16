import { Router } from "express";
import v1 from "./v1";

import notfound from "../middleware/notfound";
const router = Router();

//skip options request
router.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return
    } else {
        next();
    }
});

router.use("/v1", v1);
router.use(notfound)


export default router;
