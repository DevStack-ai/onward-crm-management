import { Router } from "express";
import Logger from "./logger";

const router = Router();

const url = "/.well-known/acme-challenge/:text"

router.get(url, (req, res, next) => {

    const path = req.path;
    const text = req.params.text;
    Logger.info(`path: ${path}`)
    if (path.includes("acme-challenge")) {
        res.send(`${text}.${process.env.CERTBOT_CODE}`)
        res.end()
        return
    }
    next()
})
export default router;