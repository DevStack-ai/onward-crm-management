import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../db"


export class CountryCOntroller {
    private prisma: PrismaClient;
    constructor() {
        this.prisma = prisma;
    }

    select = async (req: Request, res: Response) => {

        const data = await this.prisma.sis_pais.findMany({
            orderBy: {
                pai_nombre: 'asc'
            }
        })

        const mmaped = data.map((item) => {
            return {
                id: Number(item.pai_codigo),
                name: item.pai_nombre
            }
        })

        res.status(200)
        res.json(mmaped)
    }
}