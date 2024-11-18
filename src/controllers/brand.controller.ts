import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../db"


export class BrandController {
    private prisma: PrismaClient;
    constructor() {
        this.prisma = prisma;
    }

    select = async (req: Request, res: Response) => {

        const data = await this.prisma.inv_marca.findMany({
            orderBy: {
                mar_nombre: 'asc'
            }
        })

        const mapped = data.map((item) => {
            return {
                id: Number(item.mar_codigo),
                name: item.mar_nombre
            }
        })

        res.status(200)
        res.json(mapped)
    }
}