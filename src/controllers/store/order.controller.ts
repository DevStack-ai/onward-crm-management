import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../../db"
import { numberToCurrency, round } from "../utils";

import xlsx from 'xlsx'
import pdfkit from 'pdfkit-table'
import moment from "moment-timezone";


export class OrderController {
    private prisma: PrismaClient;
    constructor() {
        this.prisma = prisma;
    }

    createOrder = async (req: Request, res: Response) => {

        const cliente_codigo = req.body.cliente as number

        const cliente = await this.prisma.shp_customer.findUnique({
            where: {
                cli_codigo: cliente_codigo
            }
        })

        if (!cliente) {
            return res.status(400).json({
                message: "Cliente no existe"
            })
        }


        const cart = await this.prisma.shp_cart.findMany({
            where: {
                car_cliente: cliente.cli_codigo
            }
        })
        // const penalty_prices = await this.prisma.shp_price_penalty.findMany()

        const cartItems = cart.map((item) => item.car_articulo)
        const products = await this.prisma.inv_articulo.findMany({
            where: {
                art_codigo: {
                    in: cartItems
                }
            }
        })

        const order = await this.prisma.shp_order.create({
            data: {
                ord_cliente: cliente.cli_codigo,
                ord_fecha: new Date(),
                ord_fecha_registro: new Date(),
                ord_situacion: 0
            }
        })

        const lines = []
        let total = 0
        for (const item of cart) {

            const product = products.find((product) => product.art_codigo === item.car_articulo)

            // const percent_left = ((Number(item.car_cantidad) / Number(product.art_palet_caja))) * 100

            // const penalty_item = penalty_prices.find(penalty => Number(penalty.ppe_percentage) <= percent_left)
            const penalty = 0// penalty_item ? penalty_item.ppe_penalty : 0

            const penalty_price = 0// Number(product.art_precio_venta) * (Number(penalty) / 100)
            const price = Number(product.art_precio_venta) + penalty_price

            total += Number(price * item.car_cantidad)
            const line = this.prisma.shp_order_detail.create({
                data: {
                    shp_order_codigo: order.ord_codigo,
                    ord_articulo_codigo: product.art_codigo,
                    ord_cantidad: item.car_cantidad,
                    ord_precio: price,
                    ord_total: Number(price * item.car_cantidad).toFixed(2),
                    ord_situacion: 0,
                    percent_discount: penalty
                }
            })

            lines.push(line)
        }

        await this.prisma.$transaction(lines)

        await this.prisma.shp_cart.deleteMany({
            where: {
                car_cliente: cliente.cli_codigo
            }
        })

        await this.prisma.shp_order.update({
            where: {
                ord_codigo: order.ord_codigo
            },
            data: {
                ord_total: total.toFixed(2)
            }
        })

        res.status(200)
        res.json({
            message: "Orden creada"
        })


    }

    deleteLine = async (req: Request, res: Response) => {
        const ord_codigo = req.body.ord_codigo
        const ord_articulo_codigo = req.body.ord_articulo_codigo

        const order = await this.prisma.shp_order.findUnique({
            where: {
                ord_codigo: ord_codigo
            }
        })

        if (!order) {
            return res.status(400).json({
                message: "Orden no existe"
            })
        }

        const line = await this.prisma.shp_order_detail.findFirst({
            where: {
                shp_order_codigo: order.ord_codigo,
                ord_articulo_codigo: ord_articulo_codigo
            }
        })

        if (!line) {
            return res.status(400).json({
                message: "Linea no existe"
            })
        }

        await this.prisma.shp_order_detail.delete({
            where: {
                ord_codigo: line.ord_codigo
            }
        })

        res.status(200)
        res.json({
            message: "Linea eliminada"
        })
    }

    addLine = async (req: Request, res: Response) => {

        const ord_codigo = req.body.ord_codigo
        const art_codigo = req.body.art_codigo

        const order = await this.prisma.shp_order.findUnique({
            where: {
                ord_codigo: ord_codigo
            }
        })

        if (!order) {
            return res.status(400).json({
                message: "Orden no existe"
            })
        }

        const product = await this.prisma.inv_articulo.findUnique({
            where: {
                art_codigo: art_codigo
            }
        })

        if (!product) {
            return res.status(400).json({
                message: "Producto no existe"
            })
        }

        //check if the product is already in the order
        const lineExist = await this.prisma.shp_order_detail.findFirst({
            where: {
                shp_order_codigo: order.ord_codigo,
                ord_articulo_codigo: product.art_codigo
            }
        })

        if (lineExist) {
            return res.status(400).json({
                message: "Producto ya existe en la orden"
            })
        }

        const line = this.prisma.shp_order_detail.create({
            data: {
                shp_order_codigo: order.ord_codigo,
                ord_articulo_codigo: product.art_codigo,
                ord_cantidad: 0,
                ord_precio: 0,
                ord_total: Number(0).toFixed(2),
                ord_situacion: 0,
                percent_discount: 0
            }
        })

        await this.prisma.$transaction([line])

        res.status(200)
        res.json({
            message: "Linea agregada"
        })


    }


    listOrders = async (req: Request, res: Response) => {
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

        if (filters.customer) {
            where.ord_cliente = Number(filters.customer)
        }

        const query = {
            skip: (page - 1) * items,
            take: items,
            where: where
        }


        const [count, list] = await this.prisma.$transaction([
            this.prisma.shp_order.count({ where }),
            this.prisma.shp_order.findMany({
                ...query,
                include: {
                    cliente: true,
                    shp_order_detail: {
                        include: {
                            article: true
                        }
                    }
                }
            })
        ])
        //calculate the total of the order
        const mmaped = list.map((order) => {
            const total = order.shp_order_detail.reduce((acc, item) => acc + ((item.ord_cantidad !== undefined ? item.ord_cantidad : 0) * Number(item.ord_precio)), 0)
            return {
                ...order,
                ord_total: total.toFixed(2)
            }
        })

        res.status(200)
        res.json({
            count: count,
            rows: mmaped,
            pages: Math.ceil(count / items)
        })
    }

    getOrder = async (req: Request, res: Response) => {
        const order = await this.prisma.shp_order.findUnique({
            where: {
                ord_codigo: Number(req.params.id)
            },
            include: {
                cliente: true,
                shp_order_detail: {
                    include: {
                        article: true
                    }
                }
            }
        })

        if (!order) {
            return res.status(400).json({
                message: "Orden no existe"
            })
        }

        //delete all decimal in price
        const details = order.shp_order_detail.map((item) => {
            return {
                ...item.article,
                art_precio_venta: Number(item.article.art_precio_venta),
                art_nombre: item.article.art_nombre,
                art_cantidad: item.article.art_cantidad,
                art_palet_caja: item.article.art_palet_caja,
                ...item,


            }
        })

        const products = await this.prisma.inv_articulo.findMany({
            where: {
                art_situacion: 1,
                NOT: {
                    shp_order_detail: {
                        some: {
                            ord_codigo: Number(req.params.id)
                        }
                    }
                }
            },
            orderBy: {
                art_nombre: 'asc'
            }
        })

        const catalog = await this.prisma.costo_operativo.findMany()

        const costos = await this.prisma.orden_costo.findMany({
            where: {
                ord_codigo: Number(req.params.id)
            },
            include: {
                costo_operativo: true
            }
        })

        const costosMaped = catalog.map((item) => {

            const costo = costos.find((costo) => costo.cos_codigo === item.cos_codigo)

            return {
                costo_id: item.cos_codigo,
                id: costo ? costo.id : 0,
                nombre: item.cos_nombre,
                valor: costo ? costo.ord_valor : 0
            }
        })

        const orderMaped = {
            ...order,
            shp_order_detail: details,
            products: products,
            costos: costosMaped
        }

        res.status(200)
        res.json(orderMaped)
    }

    updateOrder = async (req: Request, res: Response) => {

        //update line an update price with same logic that cart controller and update total
        // const payload = {
        //     line: item.ord_codigo,
        //     quantity: quantity
        //   }



        const order = await this.prisma.shp_order.findUnique({
            where: {
                ord_codigo: Number(req.params.id)
            },
            include: {
                shp_order_detail: {
                    include: {
                        article: true
                    }
                }
            }
        })

        if (!order) {
            return res.status(400).json({
                message: "Orden no existe"
            })
        }

        const ord_codigo = req.body.ord_codigo
        const quantity = req.body.quantity


        const line = await this.prisma.shp_order_detail.findUnique({
            where: {
                ord_codigo: ord_codigo
            }
        })


        if (!line) {
            return res.status(400).json({
                message: "Detalle de orden no existe"
            })
        }

        const product = await this.prisma.inv_articulo.findUnique({
            where: {
                art_codigo: line.ord_articulo_codigo
            }
        })

        if (!product) {
            return res.status(400).json({
                message: "Producto no existe"
            })
        }
        const contenedor = await this.prisma.env_tipo_contenedor.findFirst({
            where: {
                tip_codigo: 40
            }
        })

        // const percent_left = ((Number(quantity) / Number(product.art_palet_caja))) * 100
        // const penalty_prices = await this.prisma.shp_price_penalty.findMany()

        // const penalty_item = penalty_prices.find(penalty => Number(penalty.ppe_percentage) <= percent_left)
        const penalty = 0 // penalty_item ? penalty_item.ppe_penalty : 0

        const penalty_price = 0 //Number(product.art_precio_venta) * (Number(penalty) / 100)
        const price = Number(product.art_precio_venta) + penalty_price

        const cubic = Number(product.art_largo) * Number(product.art_ancho) * Number(product.art_alto)
        const cubicsMetter = cubic / 1000000

        const cubicFeet = order.shp_order_detail.reduce((acc, item) => {
            const product = item.article

            const cubic = Number(product.art_largo) * Number(product.art_ancho) * Number(product.art_alto)

            //this are in cm, convert to  meter
            const cubicFeet = cubic / 1000000

            if (item.ord_codigo === line.ord_codigo) {
                return acc
            }
            return acc + (cubicFeet * item.ord_cantidad)
        }, (cubicsMetter * quantity))

        console.log("cubicFeet", cubicFeet)

        //if adding the item will exceed the cubic feet limit, 67.7mt3
        if ((cubicFeet) > (contenedor.tip_pies * 0.9)) {
            res.status(400)
            res.json({ message: "El carrito excede el limite de espacio cubico" })
            return
        }

        //check that the total of pallets is less than 20
        const newPallets = round(quantity / Number(product.art_palet_caja), 0.5)
        const totalPallets = order.shp_order_detail.reduce((acc, item) => {
            const product = item.article
            if (item.ord_codigo === line.ord_codigo) {
                return acc
            }
            return acc + round(item.ord_cantidad / Number(product.art_palet_caja), 0.5)
        }, newPallets)

        console.log("totalPallets", totalPallets)


        if ((totalPallets) > contenedor.tip_palets) {
            res.status(400)
            res.json({ message: "El carrito excede el limite de 20 palets" })
            return
        }

        //check the weright of the cart
        const totalWeight = order.shp_order_detail.reduce((acc, item) => {
            const product = item.article

            if (item.ord_codigo === line.ord_codigo) {
                return acc
            }

            return acc + (Number(product.art_peso_caja) * item.ord_cantidad)
        }, (Number(product.art_peso_caja) * quantity))

        console.log("totalWeight", totalWeight)

        if (totalWeight > Number(contenedor.tip_peso)) {
            res.status(400)
            res.json({ message: "El carrito excede el limite de peso" })
            return
        }

        await this.prisma.shp_order_detail.update({
            where: {
                ord_codigo: line.ord_codigo
            },
            data: {
                ord_cantidad: quantity,
                ord_precio: price,
                ord_total: Number(price * quantity).toFixed(2),
                percent_discount: penalty
            }
        })

        const lines = await this.prisma.shp_order_detail.findMany({
            where: {
                shp_order_codigo: ord_codigo
            }
        })

        const total = lines.reduce((acc, item) => acc + Number(item.ord_total), 0)

        await this.prisma.shp_order.update({
            where: {
                ord_codigo: order.ord_codigo
            },
            data: {
                ord_total: total.toFixed(2)
            }
        })

        res.status(200)
        res.json({
            message: "Detalle de orden actualizado"
        })

    }

    updateOrderDetail = async (req: Request, res: Response) => {
        const order = await this.prisma.shp_order_detail.findUnique({
            where: {
                ord_codigo: Number(req.params.id)
            }
        })

        if (!order) {
            return res.status(400).json({
                message: "Detalle de orden no existe"
            })
        }

        const data = req.body

        await this.prisma.shp_order_detail.update({
            where: {
                ord_codigo: order.ord_codigo
            },
            data: {
                ...data
            }
        })

        res.status(200)
        res.json({
            message: "Detalle de orden actualizado"
        })
    }

    approveOrder = async (req: Request, res: Response) => {

        const ord_codigo = req.body.ord_codigo

        const order = await this.prisma.shp_order.findUnique({
            where: {
                ord_codigo: Number(ord_codigo)
            }
        })

        if (!order) {
            return res.status(400).json({
                message: "Orden no existe"
            })
        }

        await this.prisma.shp_order.update({
            where: {
                ord_codigo: order.ord_codigo
            },
            data: {
                ord_situacion: 3
            }
        })

        res.status(200)
        res.json({
            message: "Orden aprobada"
        })
    }

    sentOrder = async (req: Request, res: Response) => {
        const ord_codigo = req.body.ord_codigo

        const order = await this.prisma.shp_order.findUnique({
            where: {
                ord_codigo: Number(ord_codigo)
            }
        })

        if (!order) {
            return res.status(400).json({
                message: "Orden no existe"
            })
        }

        await this.prisma.shp_order.update({
            where: {
                ord_codigo: order.ord_codigo
            },
            data: {
                ord_situacion: 1
            }
        })

        res.status(200)
        res.json({
            message: "Orden aprobada"
        })
    }
    rejectOrder = async (req: Request, res: Response) => {
        const ord_codigo = req.body.ord_codigo

        const order = await this.prisma.shp_order.findUnique({
            where: {
                ord_codigo: Number(ord_codigo)
            }
        })


        if (!order) {
            return res.status(400).json({
                message: "Orden no existe"
            })
        }

        await this.prisma.shp_order.update({
            where: {
                ord_codigo: order.ord_codigo
            },
            data: {
                ord_situacion: 2
            }
        })

        res.status(200)
        res.json({
            message: "Orden rechazada"
        })
    }

    downloadOrder = async (req: Request, res: Response) => {

        const fileType = req.body.fileType
        const order = Number(req.body.ord_codigo)

        const orderData = await this.prisma.shp_order.findUnique({
            where: {
                ord_codigo: order
            },
            include: {
                cliente: true,
                shp_order_detail: {
                    include: {
                        article: true
                    }
                }
            }
        })

        if (fileType === 'pdf') {
            //generate pdf

            const doc = new pdfkit({ margin: 30 });
            let buffers: any[] = [];
            doc.on('data', buffers.push.bind(buffers));
            doc.on('end', () => {
                const data = Buffer.concat(buffers);
                res.status(200);
                res.setHeader('Content-Type', 'application/pdf');
                res.setHeader('Content-Disposition', `attachment; filename="reporte.pdf"`);
                res.setHeader('Content-Length', Buffer.byteLength(data));
                res.end(data);
            });

            doc.text(`Orden de compra #${orderData.ord_codigo}`, { align: 'center' });
            doc.text(`Cliente: ${orderData.cliente.cli_nombre}`, { align: 'center' });
            doc.text(`Fecha: ${moment(orderData.ord_fecha).format("DD/MM/YYYY HH:mm")}`, { align: 'center' });


            const headers = [
                { label: "No", property: "No", headerColor: "#FFF" },
                { label: "SKU", property: "SKU", headerColor: "#FFF" },
                { label: "Nombre", property: "Nombre", headerColor: "#FFF" },
                { label: "Cantidad", property: "Cantidad", headerColor: "#FFF" },
                { label: "Precio ($)", property: "Precio ($)", headerColor: "#FFF" },
                { label: "Total ($)", property: "Total ($)", headerColor: "#FFF" },

            ]

            const mapped = orderData.shp_order_detail.map((item, index) => {
                return {
                    No: index + 1,
                    SKU: item.article.art_codigo,
                    Nombre: item.article.art_nombre,
                    Cantidad: item.ord_cantidad,
                    Precio: numberToCurrency(Number(item.ord_precio)),
                    Total: numberToCurrency((item.ord_cantidad !== undefined ? item.ord_cantidad : 0) * Number(item.ord_precio))
                }
            })

            const rows = mapped.map((item) => {
                return Object.values(item).map(String)
            })
            doc.moveDown(2)

            doc.table({
                headers: headers,
                rows: rows,
            }, {
                columnsSize: [25, 50, 340, 50, 50, 50],
            })

            doc.text(`Total: ${numberToCurrency(orderData.shp_order_detail.reduce((acc, item) => acc + ((item.ord_cantidad !== undefined ? item.ord_cantidad : 0) * Number(item.ord_precio)), 0))}`, { align: 'right' });
            doc.end();
            return

            return
        }

        if (fileType === 'xlsx') {
            //generate excel


            const result = orderData.shp_order_detail.map((item, index) => {
                return {
                    No: index + 1,
                    SKU: item.article.art_codigo,
                    Nombre: item.article.art_nombre,
                    Cantidad: item.ord_cantidad,
                    Precio: Number(item.ord_precio),
                    Total: (item.ord_cantidad !== undefined ? item.ord_cantidad : 0) * Number(item.ord_precio)
                }
            })

            const columns = result.length ? Object.keys(result[0]) : []

            const wb = xlsx.utils.book_new();

            //add the first the header of order client, date, etc
            const wsOrder = xlsx.utils.json_to_sheet([{
                "Orden de compra": orderData.ord_codigo,
                "Cliente": orderData.cliente.cli_nombre,
                "Fecha": moment(orderData.ord_fecha).format("DD/MM/YYYY HH:mm")
            }], { header: ["Orden de compra", "Cliente", "Fecha"] });



            const ws = xlsx.utils.json_to_sheet(result, { header: columns });
            //make columns width

            //add auto filter
            ws["!autofilter"] = { ref: `A1:${String.fromCharCode(65 + columns.length - 1)}1` }
            // add author
            const wscols = columns.map((item, _index) => {
                return { wch: Math.max(20, item.length) }
            })
            ws["!cols"] = wscols
            xlsx.utils.book_append_sheet(wb, ws, "Orden");
            const buffer = xlsx.write(wb, { type: "buffer", bookType: "xlsx" });
            res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            res.setHeader("Content-Disposition", "attachment; filename=Orden.xlsx");
            res.end(buffer);

            return

        }

        res.status(400)
        res.json({
            message: "Tipo de archivo no soportado"
        })

    }

    updateCosto = async (req: Request, res: Response) => {

        const ord_codigo = req.body.ord_codigo
        const cos_costo = req.body.cos_costo
        const valor = req.body.valor

        const costo = await this.prisma.orden_costo.findFirst({
            where: {
                ord_codigo: ord_codigo,
                cos_codigo: cos_costo
            }
        })

        if (costo) {
            await this.prisma.orden_costo.update({
                where: {
                    id: costo.id
                },
                data: {
                    ord_valor: valor
                }
            })
        } else {
            console.log({
                ord_codigo: ord_codigo,
                cos_codigo: cos_costo,
                ord_valor: valor,
                ord_situacion: 1
            })
            await this.prisma.orden_costo.create({
                data: {
                    ord_codigo: ord_codigo,
                    cos_codigo: cos_costo,
                    ord_valor: valor,
                    ord_situacion: 1
                }
            })
        }

        res.status(200)
        res.json({
            message: "Costo actualizado"
        })

    }

}