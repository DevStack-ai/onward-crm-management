import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../../db"
import { round } from "../utils";


export class CartController {
    private prisma: PrismaClient;
    constructor() {
        this.prisma = prisma;
    }

    getCart = async (req: Request, res: Response) => {
        const cart = await this.prisma.shp_cart.findMany({
            where: {
                car_cliente: req.body.cliente
            }
        })

        const cartItems = cart.map((item) => item.car_articulo)
        const products = await this.prisma.inv_articulo.findMany({
            where: {
                art_codigo: {
                    in: cartItems
                }
            }
        })

        const codigos = products.map((product) => product.art_codigo)

      

        // const penalty_prices = await this.prisma.shp_price_penalty.findMany()


        // const price_penalty_

        const cartList = cart.map((item) => {
            const product = products.find((product) => product.art_codigo === item.car_articulo)

            const percent_left = ((Number(item.car_cantidad) / Number(product.art_palet_caja))) * 100

            // const penalty_item = penalty_prices.find(penalty => Number(penalty.ppe_percentage) <= percent_left)
            const penalty = 0 //penalty_item ? penalty_item.ppe_penalty : 0


            const penalty_price = 0 // Number(product.art_precio_venta) * (Number(penalty) / 100)
            const price = Number(product.art_precio_venta) + penalty_price

            //calculate palet 
            return {
                art_nombre: product.art_nombre,
                art_codigo: product.art_codigo,
                art_precio_venta: price,
                art_cantidad: product.art_cantidad,
                quantity: item.car_cantidad,
                art_palet_caja: product.art_palet_caja,
                percent_left: percent_left,
                car_codigo: item.car_codigo,
                palet_percent: penalty,
                front_image: product.front_image,
            }
        })

        res.status(200)
        res.json(cartList)
    }

    addCart = async (req: Request, res: Response) => {

        const articulo: number = req.body.articulo;
        const cantidad: number = req.body.cantidad;
        const cliente: number = req.body.cliente;

        const replace: boolean = req.body.replace || false;

        const contenedor = await this.prisma.env_tipo_contenedor.findFirst({
            where: {
                tip_codigo: 40
            }
        })

        if (!contenedor) {
            res.status(400)
            res.json({ message: "No se ha configurado el contenedor de 40 pies" })
            return
        }

        if (!articulo) {
            res.status(400)
            res.json({ message: "El articulo es requerido" })
            return
        }

        if (cantidad === undefined) {
            res.status(400)
            res.json({ message: "La cantidad es requerida" })
            return
        }

        if (!cliente) {
            res.status(400)
            res.json({ message: "El cliente es requerido" })
            return
        }

        // Validar si el articulo existe
        const product = await this.prisma.inv_articulo.findFirst({
            where: {
                art_codigo: articulo
            }
        })

        if (!product) {
            res.status(400)
            res.json({ message: "El articulo no existe" })
            return
        }

        // si existe en carrito agregar la cantidad pero que no supere el stock del articulo
        const cartItem = await this.prisma.shp_cart.findFirst({
            where: {
                car_cliente: cliente,
                car_articulo: articulo
            }
        })

        const currentCart = await this.prisma.shp_cart.findMany({
            where: {
                car_cliente: req.body.cliente
            },
            include: {
                artiulo: true
            }
        })

        //calculate cubic feet of cart
        const cubicFeet = currentCart.reduce((acc, item) => {
            const product = item.artiulo

            const cubic = Number(product.art_largo) * Number(product.art_ancho) * Number(product.art_alto)
            //this are in cm, convert to feet
            const cubicFeet = cubic / 1000000
            if (item.car_codigo === cartItem?.car_codigo) {
                return acc
            }
            return acc + (cubicFeet * item.car_cantidad)
        }, 0)

        //cubic meter of new item
        const cubic = Number(product.art_largo) * Number(product.art_ancho) * Number(product.art_alto)
        // it is in cm, convert to meter 
        const cubicsMetter = cubic / 1000000

        //check if adding the item will exceed the cubic feet limit, 67.7mt3
        if ((cubicFeet + (cubicsMetter * cantidad)) > (contenedor.tip_pies * 0.9)) {
            res.status(400)
            res.json({ message: "El carrito excede el limite de espacio cubico" })
            return
        }

        //check that the total of pallets is less than 20
        const totalPallets = currentCart.reduce((acc, item) => {
            const product = item.artiulo
            if (item.car_codigo === cartItem?.car_codigo) {
                return acc
            }
            return acc + round(item.car_cantidad / Number(product.art_palet_caja), 0.5)
        }, 0)

        const newPallets = round(cantidad / Number(product.art_palet_caja), 0.5)
        if ((totalPallets + newPallets) > contenedor.tip_palets) {
            res.status(400)
            res.json({ message: "El carrito excede el limite de 20 palets" })
            return
        }

        //check the weright of the cart
        const totalWeight = currentCart.reduce((acc, item) => {
            const product = item.artiulo
            if (item.car_codigo === cartItem?.car_codigo) {
                return acc
            }
            return acc + (Number(product.art_peso_caja) * item.car_cantidad)
        }, 0)


        if (totalWeight + (Number(product.art_peso_caja) * cantidad) > Number(contenedor.tip_peso)) {
            res.status(400)
            res.json({ message: "El carrito excede el limite de peso" })
            return
        }


        if (cartItem && !replace) {

            const cart = await this.prisma.shp_cart.update({
                where: {
                    car_codigo: cartItem.car_codigo
                },
                data: {
                    car_cantidad: cartItem.car_cantidad + cantidad
                }
            })

            res.status(200)
            res.json(cart)
            return
        }

        if (cartItem && replace) {

            const cart = await this.prisma.shp_cart.update({
                where: {
                    car_codigo: cartItem.car_codigo
                },
                data: {
                    car_cantidad: cantidad
                }
            })

            res.status(200)
            res.json(cart)
            return
        }


        const cart = await this.prisma.shp_cart.create({
            data: {
                car_cliente: cliente,
                car_articulo: articulo,
                car_cantidad: cantidad,
                car_fecha_registro: new Date()
            }
        })

        res.status(200)
        res.json(cart)
    }

    updateCart = async (req: Request, res: Response) => {
        const cart = await this.prisma.shp_cart.update({
            where: {
                car_codigo: req.body.codigo
            },
            data: {
                car_cantidad: req.body.cantidad
            }
        })

        res.status(200)
        res.json(cart)
    }

    deleteCart = async (req: Request, res: Response) => {
        const cart = await this.prisma.shp_cart.delete({
            where: {
                car_codigo: req.body.codigo
            }
        })

        res.status(200)
        res.json(cart)
    }

    deleteAllCart = async (req: Request, res: Response) => {
        const cart = await this.prisma.shp_cart.deleteMany({
            where: {
                car_cliente: req.body.cliente
            }
        })

        res.status(200)
        res.json(cart)
    }

    getCartCount = async (req: Request, res: Response) => {
        const cart = await this.prisma.shp_cart.findMany({
            where: {
                car_cliente: req.body.cliente
            },
            include: {
                artiulo: true
            }
        })

        const count = cart.length
        //calculate cubic feet of cart
        const cubicFeet = cart.reduce((acc, item) => {
            const product = item.artiulo

            const cubic = Number(product.art_largo) * Number(product.art_ancho) * Number(product.art_alto)

            //this are in cm, convert to  meter
            const cubicFeet = cubic / 1000000

            return acc + (cubicFeet * item.car_cantidad)
        }, 0)
        // const penalty_prices = await this.prisma.shp_price_penalty.findMany()

        const totalMoney = cart.reduce((acc, item) => {

            const product = item.artiulo
            // const percent_left = ((Number(item.car_cantidad) / Number(product.art_palet_caja))) * 100

            // const penalty_item = penalty_prices.find(penalty => Number(penalty.ppe_percentage) <= percent_left)
            // const penalty = penalty_item ? penalty_item.ppe_penalty : 0


            const penalty_price = 0 //Number(product.art_precio_venta) * (Number(penalty) / 100)
            const price = Number(product.art_precio_venta) + penalty_price

            return acc + (price * item.car_cantidad)
        }, 0)


        res.status(200)
        res.json({ count, cubicFeet, totalMoney })
    }

    getCartTotal = async (req: Request, res: Response) => {
        const cart = await this.prisma.shp_cart.findMany({
            where: {
                car_cliente: req.body.cliente
            }
        })

        let total = 0;
        cart.forEach((item) => {
            total += item.car_cantidad
        })

        res.status(200)
        res.json(total)
    }

}