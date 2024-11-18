import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../db"


export class CountryCOntroller {
    private prisma: PrismaClient;
    constructor() {
        this.prisma = prisma;
    }

    select = async (req: Request, res: Response) => {

        const data = await this.prisma.sis_moneda.findMany({
            orderBy: {
                mon_descripcion: 'asc'
            }
        })

        const mmaped = data.map((item) => {
            return {
                id: Number(item.mon_codigo),
                name: item.mon_descripcion
            }
        })

        res.status(200)
        res.json(mmaped)
    }
}