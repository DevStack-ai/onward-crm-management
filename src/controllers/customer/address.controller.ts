import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../../db"


export class AddressController {
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

        let where: any = {
            add_cliente: Number(filters.cliente)
        }


        const query = {
            skip: (page - 1) * items,
            take: items,
            where: where,
        }


        const [count, list] = await this.prisma.$transaction([
            this.prisma.cus_address.count({ where }),
            this.prisma.cus_address.findMany({
                ...query,
                include: {
                    estado: true,
                    tipo: true
                }
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

    get = async (req: Request, res: Response) => {
        const address = Number(req.params.id);

        const addressData = await this.prisma.cus_address.findFirst({
            where: {
                add_codigo: Number(address)
            }
        })

        if (!addressData) {
            res.status(404).json({ message: "Dirección no encontrada" })
            return;
        }

        res.status(200).json(addressData)
    }

    create = async (req: Request, res: Response) => {
        const payload = req.body;

        const cliente = payload.cliente;
        const address_1 = payload.address_1;
        const address_2 = payload.address_2;
        const city = payload.city;
        const state = payload.state;
        const zip = payload.zip;
        const tipo = payload.tipo;

        if (!address_1 || !city || !state || !zip || !tipo) {
            res.status(400).json({ error: "Dirección, ciudad, estado, código postal y tipo son requeridos" });
            return;
        }

        const address = await this.prisma.cus_address.create({
            data: {
                add_cliente: cliente,
                add_tipo: tipo,
                add_calle: address_1,
                add_calle_2: address_2,
                add_ciudad: city,
                add_estado: Number(state),
                add_pais: 0,
                add_zipcode: zip,
                add_situacion: 1,
                add_defecto: 0
            }
        })

        res.status(200).json({ message: "Dirección creada exitosamente", address: address.add_codigo })
    }

    update = async (req: Request, res: Response) => {
        const payload = req.body;

        const codigo = Number(req.params.id);

        const address = await this.prisma.cus_address.update({
            where: {
                add_codigo: codigo
            },
            data: {
                add_calle: payload.address_1,
                add_calle_2: payload.address_2,
                add_ciudad: payload.city,
                add_estado: Number(payload.state),
                add_zipcode: payload.zip,
                add_tipo: payload.tipo
            }
        })

        res.status(200).json({ message: "Dirección actualizada exitosamente", address: address.add_codigo })
    }

    delete = async (req: Request, res: Response) => {
        const address = Number(req.params.id)

        //check if address exists and is not default
        const addressData = await this.prisma.cus_address.findFirst({
            where: {
                add_codigo: address
            }
        })

        if (!addressData) {
            res.status(404).json({ message: "Dirección no encontrada" })
            return;
        }

        if (addressData.add_defecto === 1) {
            res.status(400).json({ message: "No se puede eliminar la dirección por defecto" })
            return;
        }


        await this.prisma.cus_address.delete({
            where: {
                add_codigo: address
            }
        })

        res.status(200).json({ message: "Dirección eliminada exitosamente" })
    }

    setDefault = async (req: Request, res: Response) => {
        const address = Number(req.params.id)

        //check if address exists with diferent type
        const addressData = await this.prisma.cus_address.findFirst({
            where: {
                add_codigo: address
            }
        })

        if (!addressData) {
            res.status(404).json({ message: "Dirección no encontrada" })
            return;
        }

        await this.prisma.cus_address.updateMany({
            where: {
                add_cliente: addressData.add_cliente,
                add_tipo: addressData.add_tipo
            },
            data: {
                add_defecto: 0
            }
        })

        await this.prisma.cus_address.update({
            where: {
                add_codigo: address
            },
            data: {
                add_defecto: 1
            }
        })

        res.status(200).json({ message: "Dirección por defecto actualizada exitosamente" })
    }

    types = async (req: Request, res: Response) => {
        const types = await this.prisma.cus_address_type.findMany();

        const typesData = types.map((type) => {
            return {
                value: type.cat_codigo,
                label: type.cat_descripcion,
                id: type.cat_codigo,
                name: type.cat_descripcion
            }
        })

        res.status(200).json(typesData)
    }
}