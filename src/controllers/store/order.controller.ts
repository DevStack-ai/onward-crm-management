import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../../db"


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
        const penalty_prices = await this.prisma.shp_price_penalty.findMany()

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

            const percent_left = ((Number(item.car_cantidad) / Number(product.art_palet_caja))) * 100

            const penalty_item = penalty_prices.find(penalty => Number(penalty.ppe_percentage) <= percent_left)
            const penalty = penalty_item ? penalty_item.ppe_penalty : 0

            const penalty_price = Number(product.art_precio_venta) * (Number(penalty) / 100)
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
                    shp_order_detail: true
                }
            })
        ])

        res.status(200)
        res.json({
            count: count,
            rows: list,
            pages: Math.ceil(count / items)
        })
    }

    getOrder = async (req: Request, res: Response) => {
        const order = await this.prisma.shp_order.findUnique({
            where: {
                ord_codigo: Number(req.params.id)
            },
            include: {
                shp_order_detail: {
                    include: {
                        article: {
                            select: {
                                art_nombre: true,
                                art_precio_venta: true,
                                art_cantidad: true
                            }
                        }
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
                ...item,
                art_precio_venta: Number(item.article.art_precio_venta),
                art_nombre: item.article.art_nombre,
                art_cantidad: item.article.art_cantidad

                
            }
        })

        const orderMaped = {
            ...order,
            shp_order_detail: details
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
            }
        })

        if (!order) {
            return res.status(400).json({
                message: "Orden no existe"
            })
        }

        const ord_codigo = order.ord_codigo
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

        const percent_left = ((Number(quantity) / Number(product.art_palet_caja))) * 100
        const penalty_prices = await this.prisma.shp_price_penalty.findMany()

        const penalty_item = penalty_prices.find(penalty => Number(penalty.ppe_percentage) <= percent_left)
        const penalty = penalty_item ? penalty_item.ppe_penalty : 0

        const penalty_price = Number(product.art_precio_venta) * (Number(penalty) / 100)
        const price = Number(product.art_precio_venta) + penalty_price

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
                ord_codigo: ord_codigo
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
        const order = await this.prisma.shp_order.findUnique({
            where: {
                ord_codigo: Number(req.params.id)
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
        const order = await this.prisma.shp_order.findUnique({
            where: {
                ord_codigo: Number(req.params.id)
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

}