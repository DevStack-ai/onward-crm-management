import { Router, Response, Request } from 'express'
import { PrismaClient } from "@prisma/client";

const router = Router()

router.all('/connection', async (_req: Request, res: Response) => {
    const globalForPrisma = global as unknown as { prisma: PrismaClient }
    const prisma = globalForPrisma.prisma || new PrismaClient()

    console.log("DATABASE_URL", process.env.DATABASE_URL)

    await prisma.$connect()
        .then(() => {
            res.status(200).send("connected")
        }).catch((err) => {
            res.status(500).send(err)
        })
})



export default router