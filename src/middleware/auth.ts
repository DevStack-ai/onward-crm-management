import { Router, Request, Response, NextFunction } from 'express';
import { PrismaClient} from "@prisma/client";

import jwt from 'jsonwebtoken';
import Logger from './logger';


const router = Router()

router.use(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const url = req.originalUrl
        //seach value between v and /
        const value = url.match(/v(\d+)/)
        const version = value ? String(value[1]) : "1"
        const auth = req.headers.authorization;
        if (!auth) {
            res.status(403)
            res.json({ message: "Sin token" })
            return;
        }
        const barer = auth.split(" ");
        if (barer.length !== 2) {
            res.status(403)
            res.json({ message: "Sin token" })
            return;
        }
        const api_token = barer[1]
        if (!api_token) {
            res.status(403)
            res.json({ message: "Sin token" })
            return;
        }
        if (!process.env.SECRET_KEY) {
            res.status(500)
            res.json({ message: "No se ha definido la clave secreta" })
            return;
        }

        // const document = jwt.verify(api_token, process.env.SECRET_KEY) 

        // if (!document.id) {
        //     res.status(403)
        //     res.json({ message: "Token invalido" })
        //     return;
        // }
        // const convertedId = Number(document.id);
        // if (isNaN(convertedId)) {
        //     res.status(400)
        //     res.json({ error: "id must be a number" });
        //     return;
        // }

        // const prisma = new PrismaClient()
        // const user = await prisma.admin.findUnique({
        //     select: { password: false, username: true, id: true },
        //     where: { id: convertedId, is_active: 1, type: { in: version === "1" ? [0, 5, 6] : [2] } },
        // });
        // if (!user) {
        //     res.status(403)
        //     res.json({ error: "User not found" });
        //     return;
        // }
        // await prisma.$disconnect()

        // res.locals.user = user
        next()

    } catch (err) {
        Logger.error(err)
        res.status(403)
        res.end()
    }
})





export default router