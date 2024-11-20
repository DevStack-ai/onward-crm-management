import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../../db"
import fs from "fs"
import os from "os"
import path from "path"
export class ProductController {
    private prisma: PrismaClient;
    constructor() {
        this.prisma = prisma;
    }

    list = async (req: Request, res: Response) => {
        const offset = req.body.offset || 0
        const take = req.body.take || 50
        const filter = req.body.filter || ''


        let where: any = {
            art_situacion: 1
        }

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
                art_codigo: 'asc'
            }
        })

        const codigos = products.map((product) => product.art_codigo)

        const images = await this.prisma.inv_articulo_imagen.findMany({
            where: {
                img_articulo: {
                    in: codigos,
                },
                img_type: 'front'
            }
        })

        const result = products.map((product) => {
            const img = images.find((image) => image.img_articulo === product.art_codigo)
            return {
                ...product,
                img_fecha_registro: 0,
                art_usuario_update: 0,
                img: img ? img.img_imagen : null
            }
        })

        // delete all bigIntegers


        res.status(200)
        res.json(result)

    }

    table = async (req: Request, res: Response) => {
        const page = req.body.page
        const items = req.body.items
        const filters = req.body.filters

        if (!page || !items) {
            res.status(400).json({ error: "Página y registros son requeridos" });
            return;
        }

        const skip = (page - 1) * items
        let where: any = {
            art_situacion: 1
        }

        if (filters.name) {
            where = {
                ...where,
                art_nombre: {
                    contains: filters.name
                }
            }
        }

        const products = await this.prisma.inv_articulo.findMany({
            skip: skip,
            take: items,
            where: where,
            orderBy: {
                art_nombre: 'asc'
            },
            include: {
                inv_categoria: {
                    select: {
                        cat_nombre: true
                    }
                },
                inv_proveedor: {
                    select: {
                        prov_nombre_comercial: true
                    }
                },
                inv_marca: {
                    select: {
                        mar_nombre: true
                    }
                },
                inv_pais: {
                    select: {
                        pai_nombre: true
                    }
                },
            }
        })

        const count = await this.prisma.inv_articulo.count()

        res.status(200)
        res.json({
            count: count,
            rows: products,
            pages: Math.ceil(count / items)
        })
    }

    create = async (req: Request, res: Response) => {
        try {
            const payload = req.body
            //example payload
            // {
            //     "category": 27,
            //     "provider": 13,
            //     "brand": 0,
            //     "country": 502,
            //     "name": "1000",
            //     "description": "1000",
            //     "packing_description": "1000",
            //     "box_weight": "1000",
            //     "boxes_per_pallet": "1000",
            //     "boxes_per_level": "1000",
            //     "levels_per_pallet": "1000",
            //     "pallet_height": "1000",
            //     "box_length": "1000",
            //     "box_width": "1000",
            //     "box_height": "1000",
            //     "fda_number": "1000",
            //     "fce_cid": "1000",
            //     "hts_item_number": "1000",
            //     "fda_product_code": "1000",
            //     "currency": 2,
            //     "purchase_price_q": "1000",
            //     "purchase_price_d": "1000",
            //     "sale_price_d": "1000",
            //     "is_perishable": "0",
            //     "labels": "0",
            //     "unit_box": "cm",
            //     "unit": "ft",
            //     "sku": "1000",
            //     "barcode": "10000",
            //     "accounting_account": "1000",
            //     "labels_size": "1000",
            //     "participation": "1000",
            //     "observations": "1000",
            //     "life_time": "1000",
            //     "volume_description": "1000"
            // }

            const category = payload.category
            const provider = payload.provider
            const brand = payload.brand
            const country = payload.country
            const name = payload.name
            const description = payload.description
            const packing_description = payload.packing_description
            const box_weight = payload.box_weight
            const boxes_per_pallet = payload.boxes_per_pallet
            const boxes_per_level = payload.boxes_per_level
            const levels_per_pallet = payload.levels_per_pallet
            const pallet_height = payload.pallet_height
            const box_length = payload.box_length
            const box_width = payload.box_width
            const box_height = payload.box_height
            const fda_number = payload.fda_number
            const fce_cid = payload.fce_cid
            const hts_item_number = payload.hts_item_number
            const fda_product_code = payload.fda_product_code
            const currency = payload.currency
            const purchase_price_q = payload.purchase_price_q
            const purchase_price_d = payload.purchase_price_d
            const sale_price_d = payload.sale_price_d
            const is_perishable = payload.is_perishable
            const labels = payload.labels
            const unit_box = payload.unit_box
            const unit = payload.unit
            const sku = payload.sku
            const barcode = payload.barcode || ''
            const accounting_account = payload.accounting_account || ''
            const labels_size = payload.labels_size || ''
            const participation = payload.participation || 0
            const observations = payload.observations || ''
            const life_time = payload.life_time || ''
            const volume_description = payload.volume_description || ''

            //inser in inv_articulo





            const product = await this.prisma.inv_articulo.create({
                data: {
                    art_nombre: name,
                    art_codigo_interno: sku,
                    art_barcode: barcode,
                    art_descripcion: description,
                    art_descripcion_2: packing_description,
                    art_categoria: Number(category),
                    art_marca: Number(brand),
                    art_proveedor: Number(provider),
                    art_pais: Number(country),
                    art_moneda: Number(currency),
                    art_unidad_medida: unit,
                    art_dimesiones_unidad: unit_box,
                    art_observaciones: observations,
                    art_fce: Number(fce_cid),
                    art_numero_fda: String(fda_number),
                    art_perecedero: Number(is_perishable),
                    art_tiempo_vida: life_time,

                    art_etiquetas: Number(labels),
                    art_dimensiones_etiquetas: labels_size,
                    art_participacion: Number(participation),

                    art_precio_compra: Number(purchase_price_q),
                    art_precio_costo: Number(purchase_price_d),
                    art_precio_venta: Number(sale_price_d),
                    art_situacion: 1,

                    art_volumen: volume_description,
                    art_cuenta: accounting_account,
                    art_cantidad: 0,

                    art_largo: Number(box_length),
                    art_ancho: Number(box_width),
                    art_alto: Number(box_height),
                    art_peso_caja: Number(box_weight),
                    art_palet_caja: Number(boxes_per_pallet),
                    art_cajas_nivel: parseInt(boxes_per_level),
                    art_nivel_palets: parseInt(levels_per_pallet),
                    art_alto_palets: parseInt(pallet_height),

                    art_hts: parseInt(hts_item_number),
                    art_fda_producto: parseInt(fda_product_code),
                }
            })

            //save at home /images
            const baseDir = os.homedir()
            if (!fs.existsSync(`${baseDir}/images`)) {
                fs.mkdirSync(`${baseDir}/images`);
            }

            const files = req.files as Express.Multer.File[]
            
            const front = files.find((file) => file.fieldname === 'front')
            const back = files.find((file) => file.fieldname === 'back')
            const top = files.find((file) => file.fieldname === 'top')
            const bottom = files.find((file) => file.fieldname === 'bottom')

            const queue = []

            if (front) {
                const path = `${baseDir}/images/${product.art_codigo}_front.png`
                fs.writeFileSync(path,
                    front.buffer,
                    'binary'
                );

                queue.push(this.prisma.inv_articulo_imagen.create({
                    data: {
                        img_articulo: product.art_codigo,
                        img_imagen: path,
                        img_type: 'front',
                        img_fecha_registro: new Date(),
                    }
                }))
            }

            if (back) {
                const path = `${baseDir}/images/${product.art_codigo}_back.png`
                fs.writeFileSync(path,
                    back.buffer,
                    'binary'
                );

                queue.push(this.prisma.inv_articulo_imagen.create({
                    data: {
                        img_articulo: product.art_codigo,
                        img_imagen: path,
                        img_type: 'back',
                        img_fecha_registro: new Date(),
                    }
                }))
            }

            if (top) {
                const path = `${baseDir}/images/${product.art_codigo}_top.png`
                fs.writeFileSync(path,
                    top.buffer,
                    'binary'
                );

                queue.push(this.prisma.inv_articulo_imagen.create({
                    data: {
                        img_articulo: product.art_codigo,
                        img_imagen: path,
                        img_type: 'top',
                        img_fecha_registro: new Date(),
                    }
                })
                )
            }

            if (bottom) {
                const path = `${baseDir}/images/${product.art_codigo}_bottom.png`
                fs.writeFileSync(path,
                    bottom.buffer,
                    'binary'
                );

                queue.push(this.prisma.inv_articulo_imagen.create({
                    data: {
                        img_articulo: product.art_codigo,
                        img_imagen: path,
                        img_type: 'bottom',
                        img_fecha_registro: new Date(),
                    }
                }))
            }

            await Promise.all(queue)




            res.status(200)
            res.json({ message: "Producto creado exitosamente", product: product.art_codigo })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: "Error al crear producto" });
        }

    }

    update = async (req: Request, res: Response) => {
        try {
            const id = req.params.id
            const payload = req.body

            if (!id) {
                res.status(400).json({ error: "ID es requerido" });
                return;
            }

            const productExists = await this.prisma.inv_articulo.findUnique({
                where: {
                    art_codigo: Number(id)
                }
            })

            if (!productExists) {
                res.status(404).json({ error: "Producto no encontrado" });
                return;
            }

            const category = payload.category
            const provider = payload.provider
            const brand = payload.brand
            const country = payload.country
            const name = payload.name
            const description = payload.description
            const packing_description = payload.packing_description
            const box_weight = payload.box_weight
            const boxes_per_pallet = payload.boxes_per_pallet
            const boxes_per_level = payload.boxes_per_level
            const levels_per_pallet = payload.levels_per_pallet
            const pallet_height = payload.pallet_height
            const box_length = payload.box_length
            const box_width = payload.box_width
            const box_height = payload.box_height
            const fda_number = payload.fda_number
            const fce_cid = payload.fce_cid
            const hts_item_number = payload.hts_item_number
            const fda_product_code = payload.fda_product_code
            const currency = payload.currency
            const purchase_price_q = payload.purchase_price_q
            const purchase_price_d = payload.purchase_price_d
            const sale_price_d = payload.sale_price_d
            const is_perishable = payload.is_perishable
            const labels = payload.labels
            const unit_box = payload.unit_box
            const unit = payload.unit
            const sku = payload.sku
            const barcode = payload.barcode || ''
            const accounting_account = payload.accounting_account || ''
            const labels_size = payload.labels_size || ''
            const participation = payload.participation || 0
            const observations = payload.observations || ''
            const life_time = payload.life_time || ''
            const volume_description = payload.volume_description || ''

            //inser in inv_articulo



            const product = await this.prisma.inv_articulo.update({
                where: {
                    art_codigo: Number(id)
                },
                data: {
                    art_nombre: name,
                    art_codigo_interno: sku,
                    art_barcode: barcode,
                    art_descripcion: description,
                    art_descripcion_2: packing_description,
                    art_categoria: Number(category),
                    art_marca: Number(brand),
                    art_proveedor: Number(provider),
                    art_pais: Number(country),
                    art_moneda: Number(currency),
                    art_unidad_medida: unit,
                    art_dimesiones_unidad: unit_box,
                    art_observaciones: observations,
                    art_fce: Number(fce_cid),
                    art_numero_fda: String(fda_number),
                    art_perecedero: Number(is_perishable),
                    art_tiempo_vida: life_time,

                    art_etiquetas: Number(labels),
                    art_dimensiones_etiquetas: labels_size,
                    art_participacion: Number(participation),

                    art_precio_compra: Number(purchase_price_q),
                    art_precio_costo: Number(purchase_price_d),
                    art_precio_venta: Number(sale_price_d),
                    art_situacion: 1,

                    art_volumen: volume_description,
                    art_cuenta: accounting_account,
                    art_cantidad: 0,

                    art_largo: Number(box_length),
                    art_ancho: Number(box_width),
                    art_alto: Number(box_height),
                    art_peso_caja: Number(box_weight),
                    art_palet_caja: Number(boxes_per_pallet),
                    art_cajas_nivel: parseInt(boxes_per_level),
                    art_nivel_palets: parseInt(levels_per_pallet),
                    art_alto_palets: parseInt(pallet_height),

                    art_hts: parseInt(hts_item_number),
                    art_fda_producto: parseInt(fda_product_code),
                }
            })

            const baseDir = os.homedir()
            if (!fs.existsSync(`${baseDir}/images`)) {
                fs.mkdirSync(`${baseDir}/images`);
            }

            const files = req.files as Express.Multer.File[]
            console.log(files)

            const front = files.find((file) => file.fieldname === 'front')
            const back = files.find((file) => file.fieldname === 'back')
            const top = files.find((file) => file.fieldname === 'top')
            const bottom = files.find((file) => file.fieldname === 'bottom')

            const queue = []

            if (front) {
                const path = `${baseDir}/images/${product.art_codigo}_front.png`
                fs.writeFileSync(path,
                    front.buffer,
                    'binary'
                );

                const exist = await this.prisma.inv_articulo_imagen.findFirst({
                    where: {
                        img_articulo: product.art_codigo,
                        img_type: 'front'
                    }
                })

                if (exist) {
                    queue.push(this.prisma.inv_articulo_imagen.updateMany({
                        where: {
                            img_articulo: product.art_codigo,
                            img_type: 'front'
                        },
                        data: {
                            img_imagen: path
                        }
                    }))
                } else {
                    queue.push(this.prisma.inv_articulo_imagen.create({
                        data: {
                            img_articulo: product.art_codigo,
                            img_imagen: path,
                            img_type: 'front',
                            img_fecha_registro: new Date(),
                        }
                    }))
                }
            }

            if (back) {
                const path = `${baseDir}/images/${product.art_codigo}_back.png`
                fs.writeFileSync(path,
                    back.buffer,
                    'binary'
                );

                const exist = await this.prisma.inv_articulo_imagen.findFirst({
                    where: {
                        img_articulo: product.art_codigo,
                        img_type: 'back'
                    }
                })

                if (exist) {
                    queue.push(this.prisma.inv_articulo_imagen.updateMany({
                        where: {
                            img_articulo: product.art_codigo,
                            img_type: 'back'
                        },
                        data: {
                            img_imagen: path
                        }
                    }))
                } else {
                    queue.push(this.prisma.inv_articulo_imagen.create({
                        data: {
                            img_articulo: product.art_codigo,
                            img_imagen: path,
                            img_type: 'back',
                            img_fecha_registro: new Date(),
                        }
                    }))
                }
            }

            if (top) {
                const path = `${baseDir}/images/${product.art_codigo}_top.png`
                fs.writeFileSync(path,
                    top.buffer,
                    'binary'
                );

                const exist = await this.prisma.inv_articulo_imagen.findFirst({
                    where: {
                        img_articulo: product.art_codigo,
                        img_type: 'top'
                    }
                })

                if (exist) {
                    queue.push(this.prisma.inv_articulo_imagen.updateMany({
                        where: {
                            img_articulo: product.art_codigo,
                            img_type: 'top'
                        },
                        data: {
                            img_imagen: path
                        }
                    }))
                } else {
                    queue.push(this.prisma.inv_articulo_imagen.create({
                        data: {
                            img_articulo: product.art_codigo,
                            img_imagen: path,
                            img_type: 'top',
                            img_fecha_registro: new Date(),
                        }
                    }))
                }


            }

            if (bottom) {
                const path = `${baseDir}/images/${product.art_codigo}_bottom.png`
                fs.writeFileSync(path,
                    bottom.buffer,
                    'binary'
                );

                const exist = await this.prisma.inv_articulo_imagen.findFirst({
                    where: {
                        img_articulo: product.art_codigo,
                        img_type: 'bottom'
                    }
                })

                if (exist) {
                    queue.push(this.prisma.inv_articulo_imagen.updateMany({
                        where: {
                            img_articulo: product.art_codigo,
                            img_type: 'bottom'
                        },
                        data: {
                            img_imagen: path
                        }
                    }))
                } else {
                    queue.push(this.prisma.inv_articulo_imagen.create({
                        data: {
                            img_articulo: product.art_codigo,
                            img_imagen: path,
                            img_type: 'bottom',
                            img_fecha_registro: new Date(),
                        }
                    }))
                }
            }

            await Promise.all(queue)




            res.status(200)
            res.json({ message: "Producto actualizado exitosamente", product: product.art_codigo })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: "Error al actualizar producto" });
        }

    }

    delete = async (req: Request, res: Response) => {
        try {
            const id = req.params.id

            if (!id) {
                res.status(400).json({ error: "ID es requerido" });
                return;
            }

            const productExists = await this.prisma.inv_articulo.findUnique({
                where: {
                    art_codigo: Number(id)
                }
            })

            if (!productExists) {
                res.status(404).json({ error: "Producto no encontrado" });
                return;
            }

            await this.prisma.inv_articulo.update({
                where: {
                    art_codigo: Number(id)
                },
                data: {
                    art_situacion: 0
                }
            })

            res.status(200)
            res.json({ message: "Producto eliminado exitosamente" })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: "Error al eliminar producto" });
        }

    }

    activate = async (req: Request, res: Response) => {
        try {
            const id = req.params.id

            if (!id) {
                res.status(400).json({ error: "ID es requerido" });
                return;
            }

            const productExists = await this.prisma.inv_articulo.findUnique({
                where: {
                    art_codigo: Number(id)
                }
            })

            if (!productExists) {
                res.status(404).json({ error: "Producto no encontrado" });
                return;
            }

            await this.prisma.inv_articulo.update({
                where: {
                    art_codigo: Number(id)
                },
                data: {
                    art_situacion: 1
                }
            })

            res.status(200)
            res.json({ message: "Producto activado exitosamente" })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: "Error al activar producto" });
        }

    }

    get = async (req: Request, res: Response) => {
        try {
            const id = req.params.id

            if (!id) {
                res.status(400).json({ error: "ID es requerido" });
                return;
            }

            const product = await this.prisma.inv_articulo.findUnique({
                where: {
                    art_codigo: Number(id),
                    art_situacion: 1
                },
            })

            if (!product) {
                res.status(404).json({ error: "Producto no encontrado" });
                return;
            }

            // {
            //     art_nombre: name,
            //     art_codigo_interno: sku,
            //     art_barcode: barcode,
            //     art_descripcion: description,
            //     art_descripcion_2: packing_description,

            //     art_categoria: Number(category),
            //     art_marca: Number(brand),
            //     art_proveedor: Number(provider),
            //     art_pais: Number(country),
            //     art_moneda: Number(currency),

            //     art_unidad_medida: unit,
            //     art_dimesiones_unidad: unit_box,
            //     art_observaciones: observations,
            //     art_fce: Number(fce_cid),
            //     art_numero_fda: String(fda_number),

            //     art_perecedero: Number(is_perishable),
            //     art_tiempo_vida: life_time,
            //     art_etiquetas: Number(labels),
            //     art_dimensiones_etiquetas: labels_size,
            //     art_participacion: Number(participation),

            //     art_precio_compra: Number(purchase_price_q),
            //     art_precio_costo: Number(purchase_price_d),
            //     art_precio_venta: Number(sale_price_d),
            //     art_situacion: 1,
            //     art_volumen: volume_description,

            //     art_cuenta: accounting_account,
            //     art_cantidad: 0,
            //     art_largo: Number(box_length),
            //     art_ancho: Number(box_width),
            //     art_alto: Number(box_height),

            //     art_peso_caja: Number(box_weight),
            //     art_palet_caja: Number(boxes_per_pallet),
            //     art_cajas_nivel: parseInt(boxes_per_level),
            //     art_nivel_palets: parseInt(levels_per_pallet),
            //     art_alto_palets: parseInt(pallet_height),

            //     art_hts: parseInt(hts_item_number),
            //     art_fda_producto: parseInt(fda_product_code),
            // }

            const images = await this.prisma.inv_articulo_imagen.findMany({
                where: {
                    img_articulo: product.art_codigo
                }
            })

            const mmaped = {
                id: product.art_codigo,
                name: product.art_nombre,
                sku: product.art_codigo_interno,
                barcode: product.art_barcode,
                description: product.art_descripcion,
                packing_description: product.art_descripcion_2,

                category: product.art_categoria,
                brand: product.art_marca,
                provider: product.art_proveedor,
                country: product.art_pais,
                currency: product.art_moneda,

                unit: product.art_unidad_medida,
                unit_box: product.art_dimesiones_unidad,
                observations: product.art_observaciones,
                fce_cid: product.art_fce,
                fda_number: product.art_numero_fda,

                is_perishable: product.art_perecedero,
                life_time: product.art_tiempo_vida,
                labels: product.art_etiquetas,
                labels_size: product.art_dimensiones_etiquetas,
                participation: product.art_participacion,

                purchase_price_q: product.art_precio_compra,
                purchase_price_d: product.art_precio_costo,
                sale_price_d: product.art_precio_venta,
                box_length: product.art_largo,
                box_width: product.art_ancho,

                box_height: product.art_alto,
                box_weight: product.art_peso_caja,
                boxes_per_pallet: product.art_palet_caja,
                boxes_per_level: product.art_cajas_nivel,
                levels_per_pallet: product.art_nivel_palets,

                pallet_height: product.art_alto_palets,
                hts_item_number: product.art_hts,
                fda_product_code: product.art_fda_producto,
                volume_description: product.art_volumen,
                accounting_account: product.art_cuenta,
                imagess: images

            }

            res.status(200)
            res.json(mmaped)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: "Error al obtener producto" });
        }

    }

    getImage = async (req: Request, res: Response) => {
        try {
            const product = req.query.product as string
            const type = req.query.type  as string
            

            if (!product) {
                res.status(400).json({ error: "ID es requerido" });
                return;
            }

            if (!type) {
                res.status(400).json({ error: "Tipo de imagen es requerido" });
                return;
            }

            const image = await this.prisma.inv_articulo_imagen.findFirst({
                where: {
                    img_articulo: Number(product),
                    img_type: type
                }
            })

            if(!image){
                res.status(404).json({ error: "Imagen no encontrada" });
                return;
            }

            //get buffer from image
            res.status(200)
            res.sendFile(image.img_imagen)

     
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: "Error al obtener imagen" });
        }

    }
}