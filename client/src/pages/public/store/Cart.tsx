import React from "react";
import { CartProduct, Product } from "./helpers/_types";
import { addCart, createOrder, deleteCart, getCart } from "./helpers/_requests";
import { useAuth } from "../../../providers";
import Loading from "./components/Loading";
import { toast } from "react-toastify";
import { askModal } from "./components/ashModal";
import { useNavigate } from "react-router-dom";
import { KTIcon } from "metronic/helpers"
import { numberToCurrency } from "../../../utils";

interface CartProps {
    refresh: boolean,
    doRefresh: () => void
}

export default function Cart(props: CartProps) {

    const navigate = useNavigate()
    const { currentUser } = useAuth()
    const [list, setList] = React.useState<CartProduct[]>([])
    const [loading, setIsLoading] = React.useState(true)
    const [submitting, setSubmitting] = React.useState(false)
    const [editing, setEditing] = React.useState<any>(false)
    const [quantity, setQuantity] = React.useState(0)

    const fetchData = React.useCallback(async () => {
        const query = await getCart(currentUser?.cli_codigo || 0)
        const datalist = query.data as CartProduct[]

        setList(datalist)
        setIsLoading(false)
    }, [])

    React.useEffect(() => {
        fetchData()
    }, [props.refresh])

    async function updateCart(item: CartProduct, quantity: number) {
        try {
            toast.loading("Actualizando carrito")
            await addCart(item.art_codigo, quantity, currentUser?.cli_codigo || 0, true)
            toast.dismiss()
            toast.success("Carrito actualizado")
            props.doRefresh()
        } catch (err) {
            toast.dismiss()
            toast.error("Error al actualizar carrito")
            console.error(err)
        }

    }

    async function deleteItem(item: CartProduct) {
        try {
            toast.loading("Eliminando del carrito")
            await deleteCart(item.car_codigo)
            toast.dismiss()
            toast.success("Producto eliminado del carrito")
            setTimeout(() => {
                window.location.reload()
            }, 1000)

        } catch (err) {
            toast.dismiss()
            toast.error("Error al eliminar del carrito")
            console.error(err)
        }
    }

    async function modal() {
        await askModal({
            mode: "warning",
            title: "Crear orden",
            content: "¿Está seguro de crear la orden?",
            confirmAction: submit,
            confirmText: "Crear orden",
            cancelText: "Cancelar",
            cancelAction: () => { }

        })
    }

    async function submit() {
        try {
            setSubmitting(true)
            toast.loading("Creando orden")
            await createOrder(currentUser?.cli_codigo || 0)
            toast.dismiss()
            toast.success("Orden creada")
            props.doRefresh()
            navigate("/store")
        } catch (err) {
            toast.dismiss()
            toast.error("Error al crear orden")
            console.error(err)
        } finally {
            setSubmitting(false)
        }
    }


    return (
        <div>
            <h1>Carrito</h1>
            <div className="mt-5">
                {loading && <Loading />}

                {!loading && list.length === 0 && <h1>No hay productos en el carrito</h1>}

                {!loading && list.length > 0 && (
                    <div className="card p-5 ">
                        <table className="table table-striped border" style={{ overflowY: "scroll", maxHeight: "75vh" }}>
                            <thead>
                                <tr>
                                    <th scope="col" className="text-center" style={{ fontSize: "25px" }}>#</th>
                                    <th scope="col" style={{ fontSize: "25px" }}>Imagen</th>
                                    <th scope="col" style={{ fontSize: "25px" }}>Producto</th>
                                    <th scope="col" style={{ fontSize: "25px" }}>Cantidad</th>
                                    <th scope="col" style={{ fontSize: "25px" }}>Precio</th>
                                    <th scope="col" style={{ fontSize: "25px" }}>Total</th>
                                    <th scope="col" style={{ fontSize: "25px" }}>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {list.map((item, index) => (
                                    <tr key={index}>
                                        <th scope="row" className="text-center">{index + 1}</th>
                                        <td><img src={item.front_image ? `https://onward-bpo.com/api/v1/files?file=${item.front_image}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXxZR0_1ISIJx_T4oB5-5OJVSNgSMFLe8eCw&s"} alt="producto" width="100px" /></td>
                                        <td style={{ fontSize: "25px", textWrap: "wrap" }}>{item.art_nombre}</td>
                                        {(!editing || editing !== item.car_codigo) && <td style={{ fontSize: "25px" }}>
                                            {item.quantity}
                                            <span onClick={() => {
                                                setEditing(item.car_codigo)
                                                setQuantity(item.quantity || 0)
                                            }}
                                                style={{ cursor: "pointer" }}>
                                                <KTIcon iconName="pencil" style={{ fontSize: "25px" }} />
                                            </span>
                                        </td>}
                                        {(editing === item.car_codigo) && <td style={{ fontSize: "25px" }}>
                                            <input
                                                type="number"
                                                className="form-control form-control-solid"
                                                value={quantity}
                                                onChange={(ev) => setQuantity(Number(ev.target.value))} />
                                            <div className="d-flex gap-2">
                                                <button className="btn btn-success btn-sm" onClick={() => {
                                                    //val;idate quantity is an integer number 
                                                    if (!quantity || quantity < 1) {
                                                        toast.error("La cantidad debe ser mayor a 0")
                                                        return
                                                    }

                                                    if (isNaN(Number(quantity))) {
                                                        toast.error("La cantidad debe ser un numero")
                                                        return
                                                    }

                                                    if (quantity % 1 !== 0) {
                                                        toast.error("La cantidad debe ser un numero entero")
                                                        return
                                                    }

                                                    updateCart(item, quantity)
                                                    setEditing(false)
                                                }}>Guardar</button>
                                                <button className="btn btn-secondary btn-sm" onClick={() => setEditing(false)}>Cancelar</button>
                                            </div>
                                        </td>}

                                        {/* <div onClick={() => updateCart(item, Math.max(0, (item.quantity || 0) - 1))}><KTIcon iconName="minus" style={{ fontSize: "25px" }} /></div>
                                                <div style={{ fontSize: "25px" }} >{(item.quantity || 0)}</div>
                                                <div onClick={() => updateCart(item, (item.quantity || 0) + 1)}><KTIcon iconName="plus" style={{ fontSize: "25px" }} /></div> */}
                                        {/* <input
                                                    type="number"
                                                    className="form-control form-control-solid"
                                                    value={item.quantity}
                                                    onChange={(ev) => updateCart(item, Number(ev.target.value))} /> */}

                                        {/* <select className="form-control form-control-solid"
                                                defaultValue={item.quantity}
                                                onChange={(ev) => updateCart(item, Number(ev.target.value))}>
                                                {[...Array(Number(item.art_cantidad) || "0")].map((v, idx) => (<option key={idx} value={(idx + 1)}>{v || (idx + 1)}</option>))}
                                            </select> */}
                                        <td style={{ fontSize: "25px" }}>{numberToCurrency(item.art_precio_venta.toFixed(2))}</td>
                                        <td style={{ fontSize: "25px" }}>{numberToCurrency(((item.quantity !== undefined ? item.quantity : 0) * item.art_precio_venta))}</td>
                                        <td>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => deleteItem(item)}
                                            >Eliminar
                                            </button>
                                        </td>

                                    </tr>
                                ))}
                                <tr className="border-top">

                                    <td style={{ fontSize: "25px" }} colSpan={3} className="text-right">Total</td>
                                    <td style={{ fontSize: "25px", paddingLeft: "40px" }} >
                                        {list.reduce((acc, item) => acc + (item.quantity !== undefined ? item.quantity : 0), 0)}
                                    </td>
                                    <td></td>
                                    <td style={{ fontSize: "25px" }}>
                                        {numberToCurrency(
                                            list.reduce((acc, item) => acc + ((item.quantity !== undefined ? item.quantity : 0) * item.art_precio_venta), 0)
                                        )}
                                    </td>
                                    <td>
                                        <button
                                            disabled={submitting}
                                            className="btn btn-success"
                                            onClick={modal}
                                        >Crear orden
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                )}

            </div>

        </div>
    )
}