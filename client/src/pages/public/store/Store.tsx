import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { connect } from 'react-redux';
// import { actFetchProductsRequest, AddCart } from '../../actions'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addCart, getCartCount, getProducts } from './helpers/_requests';
import { useAuth } from '../../../providers';
import Loading from './components/Loading';
import Header from './components/Header';
import { Category, Product } from './helpers/_types';
import ProductItem from './components/Product';
// const instance = axios.create({
//     baseURL: "https://ilusion-server.vercel.app"
// })


interface StoreProps {
    refresh: boolean,
    doRefresh: () => void
}



function Store(props: StoreProps) {
    const { currentUser } = useAuth()

    const [filter, setFilter] = useState("")
    const [debouncedInputValue, setDebouncedInputValue] = useState("");

    const [products, setProducts] = useState<Product[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const [count, setCount] = useState(0)


    const handleInputChange = (event: any) => {
        setDebouncedInputValue(event.target.value);
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setFilter(debouncedInputValue);
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [debouncedInputValue, 500]);

    const fetchData = useCallback(async () => {
        setIsLoading(true)
        const query = await getProducts(filter)
        const datalist = query.data as Product[]

        setCategories([])
        setCount(datalist.length)
        setProducts(datalist)
        setIsLoading(false)
    }, [filter])

    useEffect(() => {
        fetchData()
    }, [filter])


    useEffect(() => {
        fetchData()
    }, [props.refresh])

    async function onAddCart(product: Product) {
        try {

            toast.loading("Agregando al carrito")
            await addCart(product.art_codigo, product.art_cantidad, currentUser?.cli_codigo || 0)
            toast.dismiss()
            toast.success("Producto agregado al carrito")
        } catch (e: any) {
            toast.dismiss()
            const message = e.response?.data?.message || "Error al agregar al carrito"
            toast.error(message)
        } finally {
            props.doRefresh()
        }

    }
    return (
        <>
            <div className="shop-sidebar-btn btn"><span>Filtros</span></div>
            <div className="row ">
                <div className="col-12 col-lg-2 shop-sidebar ">
                    <ul className="widgets wigets-shop p-2">
                        <div className='card p-2'>
                            <li className="widget wiget-price">
                                <h5 className="title">Filtros</h5>
                                <div id="slider-range"></div>
                                <input
                                    className='form-control form-control-solid'
                                    style={{ width: "250px" }}
                                    type="text" id="amount-min" placeholder='Buscar producto' onChange={(ev) => handleInputChange(ev)} />

                            </li>
                            <li className="widget wiget-shop-category my-5">
                                <h5 className="title">Categorias</h5>
                                <ul>
                                    {categories.map(cat => (
                                        <li key={cat._id}><p><input type="checkbox" className='form-check-input' name={cat._id} /><span>{cat.name}</span></p></li>
                                    ))}
                                </ul>
                            </li>
                        </div>

                    </ul>
                </div>

                <div className="col-12 col-lg-8 shop-cover">
                    {isLoading ? <Loading /> : products.length === 0 ? <h1>No hay productos</h1> : <></>}
                    {products.length && <>
                        <h2 className="title">Resultados</h2>
                        <div className="shop-sort-cover">
                            <div className="sort-left">{count} productos encontrados</div>
                            <div className="sort-right">
                                <span className="sort-name">Ordenar:</span>
                                <select className="nice-select form-control form-control-solid" style={{ width: "250px" }}>
                                    <option>A-Z</option>
                                    <option>Mayor a menor precio</option>
                                    <option>Fecha de salida</option>
                                </select>
                            </div>
                        </div>
                        <div className="row" style={{ overflowY: "scroll", maxHeight: "80vh" }}>
                            {products.map((product, idx) => (
                                <ProductItem
                                    key={idx}
                                    product={product}
                                    onAdd={onAddCart}
                                    cart={products}
                                />
                            ))}
                        </div>
                    </>}
                </div>
            </div>
        </>
    )
}




export default Store