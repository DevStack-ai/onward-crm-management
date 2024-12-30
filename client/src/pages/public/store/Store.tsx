import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
// import { actFetchProductsRequest, AddCart } from '../../actions'
import { toast } from 'react-toastify';
import { addCart, getProducts } from './helpers/_requests';
import { useAuth } from '../../../providers';
import Loading from './components/Loading';
import { Category, Product } from './helpers/_types';
import ProductItem from './components/Product';
import { KTIcon } from 'metronic/helpers';
import PasswordChange from './PaaswordChange';
import { exportCatalog } from '../../products/helpers/_requests';
// const instance = axios.create({
//     baseURL: "https://ilusion-server.vercel.app"
// })


interface StoreProps {
    refresh: boolean,
    doRefresh: () => void
}



function Store(props: StoreProps) {
    const { currentUser, logout } = useAuth()

    const [filter, setFilter] = useState("")
    const [debouncedInputValue, setDebouncedInputValue] = useState("");

    const [products, setProducts] = useState<Product[]>([])
    // const [categories, setCategories] = useState<Category[]>([])
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

        // setCategories([])
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
            <div className="row" style={{ height: "90vh" }}>
                <div className="col-12 col-lg-2  ">
                    <div className='d-flex flex-column justify-content-between' style={{ height: "90vh" }}>

                        <ul className="widgets wigets-shop p-2 ">
                            <div className='p-2 mb-2'>
                                <li className="widget wiget-price">
                                    <h5 className="title">Filtros</h5>
                                    <div id="slider-range"></div>
                                    <input
                                        className='form-control form-control-solid'
                                        style={{ width: "250px" }}
                                        type="text" id="amount-min" placeholder='Buscar producto' onChange={(ev) => handleInputChange(ev)} />
                                    <div className="dropdown">
                                        <button
                                            style={{ width: "250px" }}
                                            className="btn btn-secondary dropdown-toggle mt-2" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Descargar Catalogo
                                        </button>
                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            <a className="dropdown-item" onClick={() => {
                                                toast.promise(exportCatalog("xlsx"), {
                                                    pending: "Descargando",
                                                    success: "Descargado",
                                                    error: "Error al descargar"
                                                })
                                            }}>Excel</a>
                                            <a className="dropdown-item" onClick={() => {
                                                toast.promise(exportCatalog("pdf"), {
                                                    pending: "Descargando",
                                                    success: "Descargado",
                                                    error: "Error al descargar"
                                                })
                                            }}>Pdf</a>
                                        </div>
                                    </div>

                                </li>
                                {/* <li className="widget wiget-shop-category my-5">
                                <h5 className="title">Categorias</h5>
                                <ul>
                                    {categories.map(cat => (
                                        <li key={cat._id}><p><input type="checkbox" className='form-check-input' name={cat._id} /><span>{cat.name}</span></p></li>
                                    ))}
                                </ul>
                            </li> */}
                            </div>
                        </ul>
                        <div>
                            <PasswordChange />
                            <div className='d-flex align-items-center pointer' onClick={logout}>
                                <KTIcon iconName='arrow-left' className='h6' style={{ fontSize: "20px" }} />
                                <h2 className='mx-4'>
                                    Cerrar sesion
                                </h2>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="col-12 col-lg-8 shop-cover">
                    {isLoading ? <Loading /> : products.length === 0 ? <h1>No hay productos</h1> : <></>}
                    {!!products.length && <>
                        <h2 className="title">Resultados</h2>
                        <div className="shop-sort-cover mb-4">
                            <div className="sort-left">{count} productos encontrados</div>
                            {/* <div className="sort-right">
                                <span className="sort-name">Ordenar:</span>
                                <select className="nice-select form-control form-control-solid" style={{ width: "250px" }}>
                                    <option>A-Z</option>
                                    <option>Mayor a menor precio</option>
                                    <option>Fecha de salida</option>
                                </select>
                            </div> */}





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
            </div >
        </>
    )
}




export default Store