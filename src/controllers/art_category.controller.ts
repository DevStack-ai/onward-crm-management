import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../db"


export class CategoryController {
    private prisma: PrismaClient;
    constructor() {
        this.prisma = prisma;
    }

    select = async (req: Request, res: Response) => {

        const data = await this.prisma.inv_categoria.findMany({
            where: {
                cat_situacion: 1
            },
            orderBy: {
                cat_nombre: 'asc'
            }
        })

        const mmaped = data.map((item) => {
            return {
                id: Number(item.cat_codigo),
                name: item.cat_nombre
            }
        })

        res.status(200)
        res.json(mmaped)
    }
}