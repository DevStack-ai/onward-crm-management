import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../../db"


export class StatesController {
    private prisma: PrismaClient;
    constructor() {
        this.prisma = prisma;
    }

    getStates = async (_req: Request, res: Response) => {
        const states = await this.prisma.sis_estado.findMany()
        res.status(200).json(states)
    }

}