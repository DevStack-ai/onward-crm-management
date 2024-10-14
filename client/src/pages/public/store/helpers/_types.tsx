export interface Product {
    art_codigo: number
    art_codigo_numbererno: string
    art_pais: number
    art_barcode: string
    art_categoria: number
    art_marca: number
    art_proveedor: number
    art_nombre: string
    art_descripcion: string
    art_descripcion_2: string
    art_perecedero: number
    art_tiempo_vida: string
    art_volumen: string
    art_cuenta: string
    art_cantidad: number
    art_unidad_medida: string
    art_largo: number
    art_ancho: number
    art_alto: number
    art_dimesiones_unidad: string
    art_moneda: number
    art_precio_compra: number
    art_precio_costo: number
    art_precio_venta: number
    art_peso_caja: number
    art_palet_caja: number
    art_cajas_nivel: number
    art_nivel_palets: number
    art_alto_palets: number
    art_etiquetas: number
    art_dimensiones_etiquetas: string
    art_participacion: number
    art_numero_fda: string
    art_fce: number
    art_hts: number
    art_fda_producto: number
    art_observaciones: string
    art_usuario_update: number
    art_situacion: number
    img?: string

    quantity?: number

}

export interface CartProduct extends Product {
    car_codigo: number
}

export interface OrderProduct extends Product {
    ord_codigo: number
    ord_cantidad: number
    ord_precio: number
    ord_total: number
    percent_discount: number
}

export interface Category {
    _id: string,
    name: string
}
