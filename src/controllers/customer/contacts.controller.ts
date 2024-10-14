import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../../db"

export class ContactController {
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
            con_cliente: filters.cliente,
            con_situacion: 1
        }


        const query = {
            skip: (page - 1) * items,
            take: items,
            where: where,
        }

        const [count, list] = await this.prisma.$transaction([
            this.prisma.cus_contact.count({ where }),
            this.prisma.cus_contact.findMany({
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

    get = async (req: Request, res: Response) => {
        const codigo = req.params.id;

        if (!codigo) {
            res.status(400).json({ error: "Código es requerido" });
            return;
        }

        const contact = await this.prisma.cus_contact.findFirst({
            where: {
                con_codigo: Number(codigo)
            }
        })

        if (!contact) {
            res.status(404).json({ error: "Contacto no encontrado" });
            return;
        }

        res.status(200)
        res.json(contact)
        res.end()
    }

    create = async (req: Request, res: Response) => {
        const payload = req.body;

        const cliente = payload.cliente;
        const nombre = payload.company_contact;
        const email = payload.company_email;
        const telefono = payload.company_phone;
        const cargo = payload.company_job;

        if (!cliente || !nombre || !email || !telefono) {
            res.status(400).json({ error: "Cliente, nombre, email y telefono son requeridos" });
            return;
        }

        const contact = await this.prisma.cus_contact.create({
            data: {
                con_cliente: cliente,
                con_nombre: nombre,
                con_email: email,
                con_telefono_1: telefono,
                con_cargo: cargo,
                con_situacion: 1,
                con_defecto: 0
            }
        })

        res.status(201)
        res.json(contact)
        res.end()
    }

    update = async (req: Request, res: Response) => {
        const payload = req.body;

        const codigo = Number(req.params.id);
        
        const nombre = payload.company_contact;
        const email = payload.company_email;
        const telefono = payload.company_phone;
        const cargo = payload.company_job;

        if (!codigo || !nombre || !email || !telefono) {
            res.status(400).json({ error: "Código, nombre, email y telefono son requeridos" });
            return;
        }

        const contact = await this.prisma.cus_contact.update({
            where: {
                con_codigo: codigo
            },
            data: {
                con_nombre: nombre,
                con_email: email,
                con_telefono_1: telefono,
                con_cargo: cargo
            }
        })

        res.status(200)
        res.json(contact)
        res.end()
    }

    delete = async (req: Request, res: Response) => {
        const codigo = Number(req.params.id)
        console.log({ params: req.params })
        if (!codigo) {
            res.status(400).json({ error: "Código obligatorio" });
            return;
        }

        //check if contact exists and is not default
        const contact = await this.prisma.cus_contact.findFirst({
            where: {
                con_codigo: codigo
            }
        })

        if (!contact) {
            res.status(404).json({ error: "Contacto no encontrado" });
            return;
        }

        if (contact.con_defecto === 1) {
            res.status(400).json({ error: "No se puede eliminar el contacto por defecto" });
            return;
        }

        // soft delete
        await this.prisma.cus_contact.update({
            where: {
                con_codigo: codigo
            },
            data: {
                con_situacion: 0
            }
        })

        res.status(200)
        res.json({ message: "Contacto eliminado exitosamente" })
        res.end()
    }

    setDefault = async (req: Request, res: Response) => {
        const codigo = Number(req.params.id)

        if (!codigo) {
            res.status(400).json({ error: "Código es requerido" });
            return;
        }

        //check if contact exists
        const contact = await this.prisma.cus_contact.findFirst({
            where: {
                con_codigo: codigo
            }
        })

        if (!contact) {
            res.status(404).json({ error: "Contacto no encontrado" });
            return;
        }

        await this.prisma.cus_contact.updateMany({
            where: {
                con_cliente: contact.con_cliente
            },
            data: {
                con_defecto: 0
            }
        })

        await this.prisma.cus_contact.update({
            where: {
                con_codigo: codigo
            },
            data: {
                con_defecto: 1
            }
        })

        res.status(200)
        res.json({ message: "Contacto por defecto actualizado" })
        res.end()
    }


}