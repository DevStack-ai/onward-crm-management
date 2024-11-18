import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../db"


export class ProviderController {
    private prisma: PrismaClient;
    constructor() {
        this.prisma = prisma;
    }

    select = async (req: Request, res: Response) => {

        const data = await this.prisma.fin_proveedor.findMany({
            orderBy: {
                prov_nombre_comercial: 'asc'
            }
        })

        const mmaped = data.map((item) => {
            return {
                id: Number(item.prov_codigo),
                name: item.prov_nombre_comercial
            }
        })

        res.status(200)
        res.json(mmaped)
    }
}