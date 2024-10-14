import { useState } from "react"
import { Product } from "../helpers/_types"
import { KTIcon } from "metronic/helpers"

interface ProductProps {
    product: Product,
    onAdd: (product: Product) => void,
    cart: Product[]
}

export default function ProductItem({ product, onAdd }: ProductProps) {
    const [quantity, setQuantity] = useState(product.art_cantidad ? 1 : 0)


    return (
        <>

            <div className="col-12 col-sm-3 prod-item-col mb-2">
                <div className="card p-4">

                    <a href="#" className="product-img"><img src={product.img || "https://via.assets.so/img.jpg?w=100&h=100&tc=&bg=#cecece"} alt="producto" width="100px" /></a>
                    <div className="product-item-wrap">
                        <div className="product-item-cover pt-2">
                            <div className="price-cover">
                                <div className="new-price">$ {product.art_precio_venta}</div>
                                {/* <div className="old-price">$1.799</div> */}
                            </div>
                            <h6 className="prod-title">
                                <a href="#" className='h3'>{product.art_nombre}</a>
                            </h6>
                            <div className='d-flex justify-content-between'>
                                <select className="form-control form-control-solid"
                                    defaultValue={quantity}
                                    onChange={(ev) => setQuantity(Number(ev.target.value))}>
                                    {[...Array(Number(product.art_cantidad) || "0")].map((v, idx) => (<option key={idx} value={(idx + 1)}>{v || (idx + 1)}</option>))}
                                </select>
                                <button
                                    className="btn btn-info"
                                    disabled={!product.art_cantidad}
                                    onClick={() => onAdd({ ...product, art_cantidad: quantity })}>
                                    <KTIcon iconName='handcart' className='h1' style={{ fontSize: "20px" }} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )


}

