import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getOrder, updateOrder } from './helpers/_requests';
import Loading from '../public/store/components/Loading';
import { Costos, OrderProduct } from '../public/store/helpers/_types';
import { toast } from 'react-toastify';
import { addOrder, deleteOrder, downloadOrder, sentOrder, updateCosto } from '../public/store/helpers/_requests';
import { numberToCurrency } from '../../utils';

import { KTIcon } from "metronic/helpers"
import moment from 'moment';
import { getTag } from './helpers/_columns';
import { Modal } from 'react-bootstrap';
import Select from 'react-select';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

export function EditWrapper() {

  const [submitting, setSubmitting] = React.useState(false);
  // get the id from the url
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;

  const [isLoading, setIsLoading] = useState(true);
  const [values, setDocument] = useState<any>({});
  const [list, setList] = React.useState<OrderProduct[]>([])
  const [addModal, setAddModal] = React.useState(false)
  const [notInOrder, setNotInOrder] = React.useState<OrderProduct[]>([])
  const [newProduct, setNewProduct] = React.useState<any>({})
  const [costos, setCostos] = React.useState<Costos[]>([])


  const fetchDocument = useCallback(async () => {
    setIsLoading(true);
    const query = await getOrder(id);
    const order = query.data || {}
    const details = order.shp_order_detail || []
    const products = order.products || []
    const costos = order.costos || []


    setCostos(costos)
    setDocument(order);
    setList(details)
    setNotInOrder(products)
    setIsLoading(false);
  }, [id]);

  useEffect(() => {
    fetchDocument();
  }, []);

  async function updateCart(item: OrderProduct, quantity: number) {
    try {
      toast.loading("Actualizando orden")
      setSubmitting(true)
      const payload = {
        ord_codigo: item.ord_codigo,
        quantity: quantity
      }

      await updateOrder(id, payload)
      toast.dismiss()
      toast.success("orden actualizada")
      fetchDocument()
    } catch (err: any) {
      const message = err.response?.data?.message || "Error al actualizar orden"
      toast.dismiss()
      toast.error(message)
      console.error(err)
    } finally {
      setSubmitting(false)
    }

  }

  async function deleteItem(item: OrderProduct) {
    try {
      toast.loading("Eliminando del carrito")
      await deleteOrder(Number(id), item.art_codigo)
      toast.dismiss()
      toast.success("Producto eliminado del carrito")
      fetchDocument()
    } catch (err) {
      toast.dismiss()
      toast.error("Error al eliminar del carrito")
      console.error(err)
    }
  }

  async function addToOrder() {
    try {
      toast.loading("Agregando producto a la orden")
      await addOrder(Number(id), newProduct.value)
      setAddModal(false)
      setNewProduct(null)
      toast.dismiss()
      toast.success("Producto agregado a la orden")
      fetchDocument()
    } catch (err: any) {
      toast.dismiss()
      const message = err.response?.data?.message || "Error al agregar producto a la orden"
      toast.error(message)
      console.error(err)
    }
  }

  const [text, color] = getTag(values?.ord_situacion);

  const costo_op_por_caja = Number((costos.reduce((acc, item) => acc + Number(item.valor), 0) / list.reduce((acc, item) => acc + Number(item.ord_cantidad), 0)).toFixed(2))

  return (
    <div>
      {isLoading && <Loading />}
      <button className="btn btn-secondary btn-sm" onClick={() => navigate("/orders")}>Regresar</button>
      {(!isLoading && values) && (<div className=' p-5'>
        <div className='d-flex justify-content-between'>
          <h1>Orden #{values.ord_codigo}</h1>
          <div className="dropdown">
            <button
              style={{ fontSize: "15px" }}
              className="btn btn-secondary dropdown-toggle mt-2" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Acciones
            </button>
            <div className="dropdown-menu p-3" aria-labelledby="dropdownMenuButton">
              {values?.ord_situacion === 0 && <div onClick={() => {
                toast.promise(sentOrder(Number(id)), {
                  pending: "Enviando a revisión",
                  success: "Enviado a revisión",
                  error: "Error al enviar a revisión"
                })

                fetchDocument()
              }}>
                Enviar a revisión
              </div>}
              <div className='mt-2' onClick={() => {
                toast.promise(downloadOrder(Number(id), "pdf"), {
                  pending: "Descargando",
                  success: "Descargado",
                  error: "Error al descargar"
                })
              }}>
                Descargar PDF
              </div>
              <div className='mt-2'
                onClick={() => {
                  toast.promise(downloadOrder(Number(id), "xlsx"), {
                    pending: "Descargando",
                    success: "Descargado",
                    error: "Error al descargar"
                  })
                }}>
                Descargar XLSX
              </div>
            </div>
          </div>
        </div>

        <hr />
        <div className='row mt-4'>
          <div className='col-md-6'>
            <div className='row'>
              <div className='col-md-6' style={{ fontSize: "25px" }}>
                <h4>Cliente</h4>
                <p>{values?.cliente?.cli_nombre}</p>
              </div>
              <div className='col-md-6' style={{ fontSize: "25px" }}>
                <h4>Fecha de creación</h4>
                <p>{moment(values.ord_fecha).format("DD/MM/YYYY HH:mm")}</p>
              </div>
            </div>
          </div>
          <div className='col-md-6' style={{ fontSize: "25px" }}>
            <div className='row'>
              <div className='col-md-6'>
                <h4>Estado</h4>
                <p>
                  <span className={`badge badge-light-${color} badge-pill`} style={{ fontSize: "25px" }}>{text}</span>
                </p>
              </div>
              <div className='col-md-6' style={{ fontSize: "25px" }}>

              </div>
            </div>
          </div>
        </div>
      </div>)}
      <Tabs
        defaultActiveKey="details"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="details" title="Detalle">
          <div>
            <div className="mt-5">


              {!isLoading && list.length > 0 && (
                <div className="card p-5 ">

                  <table className="table table-striped border" style={{ overflowY: "scroll", maxHeight: "75vh" }}>
                    <thead>
                      <tr>
                        <th scope="col" style={{ fontSize: "25px" }} className="text-center">#</th>
                        <th scope="col" style={{ fontSize: "25px" }}>Imagen</th>
                        <th scope="col" style={{ fontSize: "25px" }}>Producto</th>
                        <th scope="col" style={{ fontSize: "25px" }}>Cantidad</th>
                        <th scope="col" style={{ fontSize: "25px" }}>Precio base</th>
                        <th scope="col" style={{ fontSize: "25px" }}>Precio final </th>
                        <th scope="col" style={{ fontSize: "25px" }}>Total</th>
                        <th scope="col" style={{ fontSize: "25px" }}>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {list.map((item, index) => (
                        <tr key={index}>
                          <th style={{ fontSize: "25px" }} scope="row" className="text-center">{index + 1}</th>
                          <td>
                            <img
                              src={item.front_image ? `https://onward-bpo.com/api/v1/files?file=${item.front_image}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXxZR0_1ISIJx_T4oB5-5OJVSNgSMFLe8eCw&s"}
                              alt="producto"
                              width="100px" />

                          </td>
                          <td style={{ fontSize: "25px", textWrap: "wrap" }}>{item.art_nombre}</td>
                          <td>
                            <div className='d-flex align-items-center h-100 '>
                              <div className="d-flex gap-3 align-items-center pointer" >
                                {values?.ord_situacion === 0 && <div onClick={() => !submitting && updateCart(item, Math.max(0, (item.ord_cantidad || 0) - Math.floor(item.art_palet_caja / 2)))}><KTIcon iconName="minus" style={{ fontSize: "25px" }} /></div>}
                                <div style={{ fontSize: "25px" }} >{(item.ord_cantidad || 0)}</div>
                                {values?.ord_situacion === 0 && <div onClick={() => !submitting && updateCart(item, (item.ord_cantidad || 0) + Math.floor(item.art_palet_caja / 2))}><KTIcon iconName="plus" style={{ fontSize: "25px" }} /></div>}
                              </div>
                            </div>
                          </td>
                          <td style={{ fontSize: "25px" }}>$ {item.art_precio_venta.toFixed(2)}</td>
                          <td style={{ fontSize: "25px" }}>{numberToCurrency(Number(item.ord_precio))}</td>
                          <td style={{ fontSize: "25px" }}>{numberToCurrency((item.ord_cantidad !== undefined ? item.ord_cantidad : 0) * item.ord_precio)}</td>
                          <td>
                            {values?.ord_situacion === 0 && <button
                              className="btn btn-danger"
                              onClick={() => deleteItem(item)}
                            >Eliminar
                            </button>}
                          </td>

                        </tr>
                      ))}
                      <tr className="border-top">

                        <td colSpan={8} >
                          {values?.ord_situacion === 0 && <button
                            className="btn btn-success"
                            onClick={() => setAddModal(true)}
                          >Agregar Producto</button>}
                        </td>

                      </tr>
                      <tr className="border-top">

                        <td style={{ fontSize: "25px" }} colSpan={3} className="text-right">Total</td>
                        <td style={{ fontSize: "25px", paddingLeft: "40px" }} >
                          {list.reduce((acc, item) => acc + (item.ord_cantidad !== undefined ? item.ord_cantidad : 0), 0)}
                        </td>
                        <td style={{ fontSize: "25px" }}>
                          {numberToCurrency(list.reduce((acc, item) => acc + (item.art_precio_venta !== undefined ? item.art_precio_venta : 0), 0))}
                        </td>
                        <td style={{ fontSize: "25px" }}>
                          {numberToCurrency(list.reduce((acc, item) => acc + (item.ord_precio !== undefined ? item.ord_precio : 0), 0))}
                        </td>

                        <td style={{ fontSize: "25px" }}>{numberToCurrency(
                          list.reduce((acc, item) => acc + ((item.ord_cantidad !== undefined ? item.ord_cantidad : 0) * item.ord_precio), 0)
                        )}</td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>

                </div>
              )}

            </div>
            <Modal show={addModal} onHide={() => {
              setNewProduct(null)
              setAddModal(false)
            }}>
              <Modal.Header closeButton>
                <Modal.Title>Agregar producto</Modal.Title>
              </Modal.Header>
              <Modal.Body>

                <Select
                  className='mb-3 form-select-solid'
                  isSearchable
                  placeholder="Buscar producto"
                  value={newProduct}
                  onChange={(ev) => {
                    console.log(ev)
                    setNewProduct(ev)
                  }}
                  options={notInOrder
                    .filter((item) => !list.find((i) => Number(i.art_codigo) === Number(item.art_codigo)))
                    .map((item) => ({ label: item.art_nombre, value: item.art_codigo }))}
                />


              </Modal.Body>
              <Modal.Footer>
                <button className="btn btn-secondary" onClick={() => {
                  setNewProduct(null)
                  setAddModal(false)
                }}>Cancelar</button>
                <button className="btn btn-primary" disabled={!newProduct} onClick={addToOrder}>Agregar</button>
              </Modal.Footer>
            </Modal>
          </div>
        </Tab>
        <Tab eventKey="cost" title="Costos">

          {!isLoading && list.length > 0 && (
            <>
              <div className="card p-5 ">
                <h3>DESGLOSE DE COSTOS - IMPACTO DE LA OPERACION POR CAJA</h3>
                <table className="table table-striped border" style={{ overflowY: "scroll", maxHeight: "75vh" }}>
                  <thead>
                    <tr>
                      <th scope="col" style={{ fontSize: "18px" }} className="text-center">No.</th>
                      <th scope="col" style={{ fontSize: "18px" }}>INTERNAL CODE</th>
                      <th scope="col" style={{ fontSize: "18px" }}>Active Status</th>
                      <th scope="col" style={{ fontSize: "18px" }}>Purchase Description</th>
                      <th scope="col" style={{ fontSize: "18px" }}>Cost Q</th>
                      <th scope="col" style={{ fontSize: "18px" }}>Cost $</th>
                      <th scope="col" style={{ fontSize: "18px" }}>U Price $</th>
                      <th scope="col" style={{ fontSize: "18px" }}>BOX PER PALLET</th>
                      <th scope="col" style={{ fontSize: "18px" }}>PALLETS</th>
                      <th scope="col" style={{ fontSize: "18px" }}>REQUESTED</th>
                      <th scope="col" style={{ fontSize: "18px" }}>COST $</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((item, index) => (
                      <tr key={index}>
                        <th style={{ fontSize: "18px" }} scope="row" className="text-center">{index + 1}</th>
                        <td style={{ fontSize: "18px", textWrap: "wrap" }}>{item.art_codigo_interno}</td>
                        <td style={{ fontSize: "18px" }}>Active</td>
                        <td style={{ fontSize: "18px", textWrap: "wrap" }}>{item.art_nombre}</td>
                        <td style={{ fontSize: "18px" }}>{numberToCurrency(Number(item.art_precio_compra))}</td>
                        <td style={{ fontSize: "18px" }}>{numberToCurrency(Number(item.art_precio_costo))}</td>
                        <td style={{ fontSize: "18px" }}>{numberToCurrency(Number(item.art_precio_venta))}</td>
                        <td style={{ fontSize: "18px" }}>{item.art_palet_caja}</td>
                        <td style={{ fontSize: "18px" }}>{Number(item.ord_cantidad / Number(item.art_palet_caja)).toFixed(1)}</td>
                        <td style={{ fontSize: "18px" }}>{item.ord_cantidad}</td>
                        <td style={{ fontSize: "18px" }}>{numberToCurrency(Number(item.ord_cantidad) * Number(item.art_precio_costo))}</td>

                      </tr>
                    ))}

                    <tr className="border-top">

                      <td style={{ fontSize: "18px" }} colSpan={8} className="text-right"></td>

                      <td style={{ fontSize: "18px" }}>
                        {list.reduce((acc, item) => acc + Number(item.ord_cantidad / Number(item.art_palet_caja)), 0).toFixed(1)}
                      </td>
                      <td style={{ fontSize: "18px" }}>
                        {list.reduce((acc, item) => acc + Number(item.ord_cantidad), 0)}
                      </td>

                      <td style={{ fontSize: "18px" }}>{numberToCurrency(
                        list.reduce((acc, item) => acc + (Number(item.ord_cantidad) * Number(item.art_precio_costo)), 0)
                      )}</td>
                    </tr>
                  </tbody>
                </table>

              </div>
              <div className='card p-5 mt-5'>
                <h3 className='mb-5'>Costos Operativos</h3>
                <div style={{ width: "50%" }}>

                  <div className='row mb-3'>
                    <div className='col-4'>
                      <b>INVENTARIO</b>
                    </div>
                    <div className='col-2'>
                      {numberToCurrency(
                        list.reduce((acc, item) => acc + (Number(item.ord_cantidad) * Number(item.art_precio_costo)), 0)
                      )}
                    </div>
                  </div>
                  <hr style={{ width: "500px" }} />
                  {costos.map((item) => (
                    <CostoInput {...item} fetchDocument={fetchDocument} />
                  ))}
                  <hr style={{ width: "1000px" }} />
                  <div className='row mb-3'>
                    <div className='col-4' style={{ margin: 0 }}>
                      <b>TOTAL COSTO OPERATIVO</b>
                    </div>
                    <div className='col-2' style={{ margin: 0 }}>
                      {numberToCurrency(costos.reduce((acc, item) => acc + Number(item.valor), 0))}
                    </div>
                    <div className='col-4' style={{ margin: 0 }}>
                      <b>COSTO POR CAJA OPERATIVO</b>
                    </div>
                    <div className='col-2' style={{ margin: 0 }}>
                      {numberToCurrency(costo_op_por_caja)}
                    </div>
                  </div>
                  <hr style={{ width: "500px" }} />

                  <div className='row mb-3'>
                    <div className='col-4' style={{ margin: 0 }}>
                      <b>GRAN TOTAL</b>
                    </div>
                    <div className='col-2' style={{ margin: 0 }}>
                      {numberToCurrency(costos.reduce((acc, item) => acc + Number(item.valor), 0) + list.reduce((acc, item) => acc + (Number(item.ord_cantidad) * Number(item.art_precio_costo)), 0))}
                    </div>

                  </div>
                </div>
              </div>

            </>
          )}
        </Tab>
        <Tab eventKey="comercial" title="Propuesta Comercial">
          {!isLoading && list.length > 0 && (
            <>
              <div className="card p-5 ">
                <h3>PROPUESTA COMERCIAL</h3>
                <table className="table table-striped border" style={{ overflowY: "scroll", maxHeight: "75vh" }}>
                  <thead>
                    <tr>
                      <th scope="col" style={{ fontSize: "18px" }} className="text-center">No.</th>
                      <th scope="col" style={{ fontSize: "18px" }}>INTERNAL CODE</th>
                      <th scope="col" style={{ fontSize: "18px" }}>Active Status</th>
                      <th scope="col" style={{ fontSize: "18px" }}>Purchase Description</th>
                      <th scope="col" style={{ fontSize: "18px" }}>Cost Q</th>
                      <th scope="col" style={{ fontSize: "18px" }}>Precio Venta FOB $</th>
                      <th scope="col" style={{ fontSize: "18px" }}>Precio V USA $</th>
                      <th scope="col" style={{ fontSize: "18px" }}>BOX PER PALLET</th>
                      <th scope="col" style={{ fontSize: "18px" }}>PALLETS</th>
                      <th scope="col" style={{ fontSize: "18px" }}>REQUESTED</th>
                      <th scope="col" style={{ fontSize: "18px" }}>COSTS $</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((item, index) => (
                      <tr key={index}>
                        <th style={{ fontSize: "18px" }} scope="row" className="text-center">{index + 1}</th>
                        <td style={{ fontSize: "18px", textWrap: "wrap" }}>{item.art_codigo_interno}</td>
                        <td style={{ fontSize: "18px" }}>Active</td>
                        <td style={{ fontSize: "18px", textWrap: "wrap" }}>{item.art_nombre}</td>
                        <td style={{ fontSize: "18px" }}>{numberToCurrency(Number(item.art_precio_compra))}</td>
                        <td style={{ fontSize: "18px" }}>{numberToCurrency(Number(item.art_precio_costo))}</td>
                        <td style={{ fontSize: "18px" }}>{numberToCurrency(Number(item.art_precio_venta + costo_op_por_caja))}</td>
                        <td style={{ fontSize: "18px" }}>{item.art_palet_caja}</td>
                        <td style={{ fontSize: "18px" }}>{Number(item.ord_cantidad / Number(item.art_palet_caja)).toFixed(1)}</td>
                        <td style={{ fontSize: "18px" }}>{item.ord_cantidad}</td>
                        <td style={{ fontSize: "18px" }}>{numberToCurrency(Number(item.ord_cantidad) * (Number(item.art_precio_venta + costo_op_por_caja)))}</td>

                      </tr>
                    ))}

                    <tr className="border-top">

                      <td style={{ fontSize: "18px" }} colSpan={8} className="text-right"></td>

                      <td style={{ fontSize: "18px" }}>
                        {list.reduce((acc, item) => acc + Number(item.ord_cantidad / Number(item.art_palet_caja)), 0).toFixed(1)}
                      </td>
                      <td style={{ fontSize: "18px" }}>
                        {list.reduce((acc, item) => acc + Number(item.ord_cantidad), 0)}
                      </td>

                      <td style={{ fontSize: "18px" }}>{numberToCurrency(
                        list.reduce((acc, item) => acc + (Number(item.ord_cantidad) * (Number(item.art_precio_venta + costo_op_por_caja))), 0)
                      )}</td>
                    </tr>
                  </tbody>
                </table>

              </div>


            </>
          )}
        </Tab>
      </Tabs>
    </div>
  );
}

function CostoInput(costo: Costos & { fetchDocument: () => void }) {
  const params = useParams();
  const id = params.id;

  const [value, setValue] = React.useState<any>(costo.valor)
  const [submitting, setSubmitting] = React.useState(false)
  const [edit, setEdit] = React.useState(false)

  async function updateToCosto() {
    
    try {

      if(isNaN(Number(value))) {
        toast.error("Valor no valido")
        return
      }

      toast.loading("Actualizando costo")
      setSubmitting(true)
      await updateCosto(Number(id), costo.costo_id, value)
      await costo.fetchDocument()
      toast.dismiss()
      toast.success("Costo actualizado")
      setEdit(false)


    } catch (err: any) {
      const message = err.response?.data?.message || "Error al actualizar costo"
      toast.dismiss()
      toast.error(message)
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }


  return (<>
    <div className='row mb-3'>
      <div className='col-4'>
        {costo.nombre}
      </div>
      <div className='col-2 d-flex'>
        {edit && <input
          style={{ minWidth: "150px" }}
          className='form-control form-control-solid'
          onChange={(ev) => setValue(ev.target.value)}
          type="number"
          value={value} />}
        {!edit && <span>{numberToCurrency(costo.valor)}</span>}
        {!edit && (<div onClick={() => setEdit(true)} className='pointer'>
          <KTIcon iconName="pencil" />
        </div>)
        }
        {edit && (
          <button
            disabled={submitting || value === costo.valor || value === 0}
            className="btn btn-primary btn-sm mx-2"
            onClick={updateToCosto}
          >Guardar</button>
        )}
      </div>
    </div>
  </>)
}