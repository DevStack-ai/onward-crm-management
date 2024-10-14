import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getOrder, updateOrder } from './helpers/_requests';
import Loading from '../public/store/components/Loading';
import { CartProduct, OrderProduct } from '../public/store/helpers/_types';
import { toast } from 'react-toastify';
import { addCart, deleteCart } from '../public/store/helpers/_requests';
import { numberToCurrency } from '../../utils';
import { askModal } from '../public/store/components/ashModal';


export function EditWrapper() {
  const navigate = useNavigate();

  // get the id from the url
  const params = useParams();
  const id = params.id;

  const [isLoading, setIsLoading] = useState(true);
  const [values, setDocument] = useState<any>({});
  const [list, setList] = React.useState<OrderProduct[]>([])


  const fetchDocument = useCallback(async () => {
    setIsLoading(true);
    const query = await getOrder(id);
    const order = query.data || {}
    const details = order.shp_order_detail || []
    console.log(order)
    setDocument(order);
    setList(details)
    setIsLoading(false);
  }, [id]);

  useEffect(() => {
    fetchDocument();
  }, []);

  async function updateCart(item: OrderProduct, quantity: number) {
    try {
      toast.loading("Actualizando orden")

      const payload = {
        ord_codigo: item.ord_codigo,
        quantity: quantity
      }

      await updateOrder(id, payload)
      toast.dismiss()
      toast.success("orden actualizada")
      fetchDocument()
    } catch (err) {
      toast.dismiss()
      toast.error("Error al actualizar carrito")
      console.error(err)
    }

  }

  async function deleteItem(item: OrderProduct) {
    try {
      toast.loading("Eliminando del carrito")
      // await deleteCart(item.car_codigo)
      toast.dismiss()
      toast.success("Producto eliminado del carrito")
      fetchDocument()
    } catch (err) {
      toast.dismiss()
      toast.error("Error al eliminar del carrito")
      console.error(err)
    }
  }


  return (
    <div>
      <div>
        <h1>Carrito</h1>
        <div className="mt-5">
          {isLoading && <Loading />}

          {!isLoading && list.length === 0 && <h1>No hay productos en el carrito</h1>}

          {!isLoading && list.length > 0 && (
            <div className="card p-5 ">

              <table className="table table-striped border" style={{ overflowY: "scroll", maxHeight: "75vh" }}>
                <thead>
                  <tr>
                    <th scope="col" className="text-center">#</th>
                    <th scope="col">Producto</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Precio base</th>
                    <th scope="col">Precio final </th>
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
                        <div className='d-flex align-items-center h-100 '>

                          <select className="form-control form-control-solid w-15"
                            defaultValue={item.ord_cantidad}
                            onChange={(ev) => askModal({
                              mode: "warning",
                              title: "Actualizar cantidad",
                              content: "Cambiar la cantidad",
                              confirmAction: () => updateCart(item, Number(ev.target.value)),
                              confirmText: "Actualizar",
                              cancelAction: () => { },
                              cancelText: "Cancelar"
                            })}>
                            {[...Array(Number(item.art_cantidad) || "0")].map((v, idx) => (<option key={idx} value={(idx + 1)}>{v || (idx + 1)}</option>))}
                          </select>

                          de {item.art_cantidad}
                        </div>

                      </td>
                      <td>$ {item.art_precio_venta.toFixed(2)}</td>
                      <td>{numberToCurrency(Number(item.ord_precio))}</td>
                      <td>{numberToCurrency((item.quantity || 1) * item.ord_precio)}</td>
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
                    <td></td>

                    <td>{numberToCurrency(values.ord_total)}</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>

            </div>
          )}

        </div>

      </div>


    </div>
  );
}

