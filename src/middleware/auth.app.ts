import { Router, Request, Response, NextFunction } from 'express';
import { PrismaClient, user as UserModel } from "@prisma/client";

import jwt from 'jsonwebtoken';
import Logger from './logger';


const router = Router()

router.use(async (req: Request, res: Response, next: NextFunction) => {
    try {
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

        const document = jwt.verify(api_token, process.env.SECRET_KEY) as UserModel

        if (!document.id) {
            res.status(403)
            res.json({ message: "Token invalido" })
            return;
        }
        const convertedId = Number(document.id);
        if (isNaN(convertedId)) {
            res.status(400)
            res.json({ error: "id must be a number" });
            return;
        }

        const prisma = new PrismaClient()
        let user = await prisma.user.findUnique({
            include: {
                area_name: true,
            },
            where: { id: convertedId },
        });

        if (!user) {
            res.status(403)
            res.json({ error: "Usuario no existe" });
            return;
        }

        if (user.status_id === 2) {
            res.status(403)
            res.json({ error: "Usuario inactivo" });
            return;
        }

        if (user.status_id === 3 && !req.originalUrl.includes("reset-password")) {
            res.status(403)
            res.json({ error: "Usuario bloqueado" });
            return;
        }

        if (user.status_id === 4) {
            res.status(403)
            res.json({ error: "Usuario desactivado" });
            return;
        }

        await prisma.$disconnect()


        res.locals.appUser = { ...user, area: user?.area_name?.name || user.area || "" }
        next()

    } catch (err) {
        Logger.error(err)
        res.status(403)
        res.json({ message: "Token invalido" })
        res.end()
    }
})





export default router