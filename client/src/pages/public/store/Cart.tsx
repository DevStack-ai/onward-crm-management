import React from "react";
import { CartProduct, Product } from "./helpers/_types";
import { addCart, createOrder, deleteCart, getCart } from "./helpers/_requests";
import { useAuth } from "../../../providers";
import Loading from "./components/Loading";
import { toast } from "react-toastify";
import { askModal } from "./components/ashModal";
import { useNavigate } from "react-router-dom";

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
            props.doRefresh()
        } catch (err) {
            toast.dismiss()
            toast.error("Error al eliminar del carrito")
            console.error(err)
        }
    }

    async function modal(){
        await askModal({
            mode: "warning",
            title: "Crear orden",
            content: "¿Está seguro de crear la orden?",
            confirmAction: submit,
            confirmText: "Crear orden",
            cancelText: "Cancelar",
            cancelAction: () => {}

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
            navigate("/store/orders")
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
                                    <th scope="col" className="text-center">#</th>
                                    <th scope="col">Producto</th>
                                    <th scope="col">Cantidad</th>
                                    <th scope="col">Precio</th>
                                    <th scope="col">Total</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {list.map((item, index) => (
                                    <tr key={index}>
                                        <th scope="row" className="text-center">{index + 1}</th>
                                        <td>{item.art_nombre}</td>
                                        <td>
                                            <select className="form-control form-control-solid"
                                                defaultValue={item.quantity}
                                                onChange={(ev) => updateCart(item, Number(ev.target.value))}>
                                                {[...Array(Number(item.art_cantidad) || "0")].map((v, idx) => (<option key={idx} value={(idx + 1)}>{v || (idx + 1)}</option>))}
                                            </select>
                                        </td>
                                        <td>$ {item.art_precio_venta.toFixed(2)}</td>
                                        <td>$ {((item.quantity || 1) * item.art_precio_venta).toFixed(2)}</td>
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

                                    <td colSpan={4} className="text-right">Total</td>
                                    <td>$ {list.reduce((acc, item) => acc + ((item.quantity || 1) * item.art_precio_venta), 0).toFixed(2)}</td>
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