import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../../db"


export class ProductController {
    private prisma: PrismaClient;
    constructor() {
        this.prisma = prisma;
    }

    list = async (req: Request, res: Response) => {
        const offset = req.body.offset || 0
        const take = req.body.take || 50
        const filter = req.body.filter || ''


        let where = {}

        if (filter) {
            where = {
                art_nombre: {
                    contains: filter
                }
            }
        }

        const products = await this.prisma.inv_articulo.findMany({
            skip: offset,
            take: take,
            where: where,
            orderBy: {
                art_nombre: 'asc'
            }
        })

        const codigos = products.map((product) => product.art_codigo)

        const images = await this.prisma.inv_articulo_imagen.findMany({
            where: {
                img_previsualizacion: 1,
                img_articulo: {
                    in: codigos,
                }
            }
        })

        const result = products.map((product) => {
            const img = images.find((image) => image.img_articulo === product.art_codigo)
            return {
                ...product,
                img_fecha_registro: 0,
                art_usuario_update: 0,
                img: img ? img.img_archivo : null
            }
        })

        // delete all bigIntegers


        res.status(200)
        res.json(result)

    }

}