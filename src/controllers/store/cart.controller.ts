import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../../db"


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

        const images = await this.prisma.inv_articulo_imagen.findMany({
            where: {
                img_previsualizacion: 1,
                img_articulo: {
                    in: codigos,
                }
            }
        })

        const penalty_prices = await this.prisma.shp_price_penalty.findMany()


        // const price_penalty_

        const cartList = cart.map((item) => {
            const product = products.find((product) => product.art_codigo === item.car_articulo)
            const img = images.find((image) => image.img_articulo === product?.art_codigo)

            const percent_left = ((Number(item.car_cantidad) / Number(product.art_palet_caja))) * 100

            const penalty_item = penalty_prices.find(penalty => Number(penalty.ppe_percentage) <= percent_left)
            const penalty = penalty_item ? penalty_item.ppe_penalty : 0


            const penalty_price = Number(product.art_precio_venta) * (Number(penalty) / 100)
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

                img: img ? img.img_archivo : null
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

        if (!cantidad) {
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
            const cubicFeet = cubic / 28316.8466

            return acc + (cubicFeet * item.car_cantidad)
        }, 0)

        //cubic feet of new item
        const cubic = Number(product.art_largo) * Number(product.art_ancho) * Number(product.art_alto)
        const cubicFeetItem = cubic / 28316.8466

        //check if adding the item will exceed the cubic feet limit, 40 cubic feet
        if (cubicFeet + (cubicFeetItem * cantidad) > (contenedor.tip_pies * 0.9)) {
            res.status(400)
            res.json({ message: "El carrito excede el limite de 40 pies cubicos" })
            return
        }

        //check that the total of pallets is less than 20
        const totalPallets = currentCart.reduce((acc, item) => {
            const product = item.artiulo
            return acc + (Number(product.art_palet_caja) * item.car_cantidad)
        }, 0)

        if (totalPallets + (Number(product.art_palet_caja) * cantidad) > contenedor.tip_palets) {
            res.status(400)
            res.json({ message: "El carrito excede el limite de 20 palets" })
            return
        }

        //check the weright of the cart
        const totalWeight = currentCart.reduce((acc, item) => {
            const product = item.artiulo
            return acc + (Number(product.art_peso_caja) * item.car_cantidad)
        }, 0)


        if (totalWeight + (Number(product.art_peso_caja) * cantidad) > Number(contenedor.tip_peso)) {
            res.status(400)
            res.json({ message: "El carrito excede el limite de peso" })
            return
        }


        if (cartItem && !replace) {
            const stock = Number(product.art_cantidad) - cartItem.car_cantidad
            if (cantidad > stock) {
                res.status(400)
                res.json({ message: "La cantidad supera el stock" })
                return
            }
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
            const stock = Number(product.art_cantidad)
            if (cantidad > stock) {
                res.status(400)
                res.json({ message: "La cantidad supera el stock" })
                return
            }
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
            //this are in cm, convert to feet
            const cubicFeet = cubic / 28316.8466

            return acc + (cubicFeet * item.car_cantidad)
        }, 0)


        res.status(200)
        res.json({ count, cubicFeet })
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