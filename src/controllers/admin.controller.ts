import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../db"


export class AdminController {

    private prisma: PrismaClient;
    constructor() {
        this.prisma = prisma;
    }

    list = async (req: Request, res: Response) => {
        const page = req.body.page
        const items = req.body.items
        const filters = req.body.filters || {}


        if (!page || !items) {
            res.status(400).json({ error: "Página y registros son requeridos" });
            return;
        }

        if (!Number.isInteger(page) || !Number.isInteger(items)) {
            res.status(400).json({ error: "Página y registros deben ser enteros" });
            return;
        }

        if (page < 1 || items < 1) {
            res.status(400).json({ error: "Página y registros deben ser mayores a 0" });
            return;
        }

        let where: any = {}

        // if (filters.name) {
        //     where.cli_nombre = {
        //         contains: filters.name
        //     }
        // }

        const query = {
            skip: (page - 1) * items,
            take: items,
            where: where,
        }

        const [count, list] = await this.prisma.$transaction([
            this.prisma.shp_admin.count({ where }),
            this.prisma.shp_admin.findMany({
                ...query,
            })
        ])




        res.status(200)
        res.json({
            count: count,
            rows: list,
            pages: Math.ceil(count / items)
        })
        res.end()
    }


    resetPassword = async (req: Request, res: Response) => {
        const payload = req.body;
        const codigo = Number(req.params.id);

        const password = payload.password

        const admin = await this.prisma.shp_admin.update({
            where: {
                adm_codigo: codigo
            },
            data: {
                adm_password: password
            }
        })

        res.status(200).json({
            message: "Cliente aprobado exitosamente",
            admin: admin.adm_codigo
        })


    }

    get = async (req: Request, res: Response) => {
        const codigo = req.params.id;

        if (!codigo) {
            res.status(400).json({ error: "Código es requerido" });
            return;
        }

        const customer = await this.prisma.shp_admin.findFirst({
            where: {
                adm_codigo: Number(codigo)
            }

        })

        if (!customer) {
            res.status(404).json({ error: "Cliente no encontrado" });
            return;
        }

        res.status(200)
        res.json(customer)
        res.end()
    }

    create = async (req: Request, res: Response) => {

        try {


            const payload = req.body;

            const admin = await this.prisma.shp_admin.create({
                data: {
                    adm_nombre: payload.name,
                    adm_usuario: payload.adm_usuario,
                    adm_password: payload.password,
                    adm_tipo: 1,
                    adm_situacion: 1
                }
            })

            res.status(200).json({
                message: "Cliente creado exitosamente",
                admin: admin.adm_codigo
            })
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }


}