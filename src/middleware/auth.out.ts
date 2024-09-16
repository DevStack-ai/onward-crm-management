import { Router, Request, Response, NextFunction } from 'express';
import { PrismaClient, user as UserModel } from "@prisma/client";

import Logger from './logger';


const router = Router()

router.use(async (req: Request, res: Response, next: NextFunction) => {
    try {

        const authorization = req.headers.authorization
        if (!authorization) {
            res.status(403)
            res.json({ message: "Sin llave de acceso" })
            return
        }

        const apikey = authorization.split(" ")[1]
        if (!apikey) {
            res.status(403)
            res.json({ message: "Sin llave de acceso" })
            return
        }
        const prisma = new PrismaClient()
        const hasRegister = await prisma.porta_out_apikey.findFirst({ where: { key: apikey } })
        if (!hasRegister) {
            res.status(403)
            res.json({ message: "Llave de acceso no valida" })
            return
        }
        if (!hasRegister.status) {
            res.status(403)
            res.json({ message: "Llave de acceso inactiva" })
            return

        }
        await prisma.$disconnect()
        next()

    } catch (err) {
        Logger.error(err)
        res.end()
    }
})





export default router