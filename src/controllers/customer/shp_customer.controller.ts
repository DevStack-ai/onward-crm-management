import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../../db"


export class CustomerController {
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

        if (filters.name) {
            where.cli_nombre = {
                contains: filters.name
            }
        }

        const query = {
            skip: (page - 1) * items,
            take: items,
            where: where,
        }

        const [count, list] = await this.prisma.$transaction([
            this.prisma.shp_customer.count({ where }),
            this.prisma.shp_customer.findMany({
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

    approve = async (req: Request, res: Response) => {
        const payload = req.body;

        const codigo = Number(req.params.id);

        console.log({payload})
        const username = payload.usermame
        const password = payload.password

        // check if username is already in use

        const user = await this.prisma.shp_customer.findFirst({
            where: {
                cli_usuario: username
            }
        })

        if (user) {
            res.status(400).json({ error: "Usuario ya existe" });
            return;
        }

        const customer = await this.prisma.shp_customer.update({
            where: {
                cli_codigo: codigo
            },
            data: {
                cli_situacion: 2,
                cli_usuario: username,
                cli_password: password
            }
        })

        res.status(200).json({
            message: "Cliente aprobado exitosamente",
            customer: customer.cli_codigo
        })
    }

    get = async (req: Request, res: Response) => {
        const codigo = req.params.id;

        if (!codigo) {
            res.status(400).json({ error: "Código es requerido" });
            return;
        }

        const customer = await this.prisma.shp_customer.findFirst({
            where: {
                cli_codigo: Number(codigo)
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


        const payload = req.body;

        const company_name = payload.company_name;

        const company_billing_address_1 = payload.company_billing_address_1;
        const company_billing_address_2 = payload.company_billing_address_2;
        const company_billing_city = payload.company_billing_city;
        const company_billing_state = payload.company_billing_state;
        const company_billing_zip = payload.company_billing_zip;

        const company_delivery_address_1 = payload.company_delivery_address_1;
        const company_delivery_address_2 = payload.company_delivery_address_2;
        const company_city = payload.company_city;
        const company_state = payload.company_state;
        const company_zip = payload.company_zip;

        const company_contact = payload.company_contact;
        const company_email = payload.company_email;
        const company_phone = payload.company_phone;
        const company_job = payload.company_job;


        const customer = await this.prisma.shp_customer.create({
            data: {
                cli_nombre: company_name,
                cli_abreviacion: "",
                cli_razon_social: "",
                cli_duns: "",
                cli_ein: "",

                cli_monto_credito_asegurado: '',
                cli_credito_autorizado: '',
                cli_terms_credito: '',
                cli_fecha_registro: new Date(),
                cli_situacion: 1
            }
        })

        await this.prisma.cus_address.create({
            data: {
                add_cliente: customer.cli_codigo,
                add_tipo: 1,
                add_calle: company_delivery_address_1,
                add_calle_2: company_delivery_address_2,
                add_ciudad: company_city,
                add_estado: Number(company_state),
                add_pais: 0,
                add_zipcode: company_zip,
                add_situacion: 1,
                add_defecto: 1
            }
        })

        await this.prisma.cus_address.create({
            data: {
                add_cliente: customer.cli_codigo,
                add_tipo: 2,
                add_calle: company_billing_address_1,
                add_calle_2: company_billing_address_2,
                add_ciudad: company_billing_city,
                add_estado: Number(company_billing_state),
                add_pais: 0,
                add_zipcode: company_billing_zip,
                add_situacion: 1,
                add_defecto: 1
            }
        })

        await this.prisma.cus_contact.create({
            data: {
                con_cargo: company_job,
                con_cliente: customer.cli_codigo,
                con_nombre: company_contact,
                con_email: company_email,
                con_telefono_1: company_phone,
                con_situacion: 1,
                con_defecto: 1
            }
        })

        res.status(201).json({
            message: "Cliente creado exitosamente",
            customer: customer.cli_codigo
        })


    }


}