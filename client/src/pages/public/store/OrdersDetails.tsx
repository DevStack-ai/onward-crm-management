import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getOrder } from '../../orders/helpers/_requests';
import Loading from '../store/components/Loading';
import {Costos,  OrderProduct } from '../store/helpers/_types';
import { toast } from 'react-toastify';
import { downloadOrder } from '../store/helpers/_requests';
import { numberToCurrency } from '../../../utils';

import moment from 'moment';
import { getTag } from '../../orders/helpers/_columns';

export function DetailsOrder() {

  // get the id from the url
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;

  const [isLoading, setIsLoading] = useState(true);
  const [values, setDocument] = useState<any>({});
  const [list, setList] = React.useState<OrderProduct[]>([])
  const [costos, setCostos] = React.useState<Costos[]>([])


  const fetchDocument = useCallback(async () => {
    setIsLoading(true);
    const query = await getOrder(id);
    const order = query.data || {}
    const details = order.shp_order_detail || []
    const costos = order.costos || []

    setCostos(costos)

    setDocument(order);
    setList(details)
    setIsLoading(false);
  }, [id]);

  useEffect(() => {
    fetchDocument();
  }, []);




  const [text, color] = getTag(values?.ord_situacion);
  const costo_op_por_caja = Number((costos.reduce((acc, item) => acc + Number(item.valor), 0) / list.reduce((acc, item) => acc + Number(item.ord_cantidad), 0)).toFixed(2))


  return (
    <div>
      {isLoading && <Loading />}
      <button className="btn btn-secondary btn-sm" onClick={() => navigate(-1)}>Regresar</button>
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
      {!isLoading && list.length > 0 && (
        <>
          <div className="card p-5 ">
            <table className="table table-striped border" style={{ overflowY: "scroll", maxHeight: "75vh" }}>
              <thead>
                <tr>
                  <th scope="col" style={{ fontSize: "18px" }} className="text-center">No.</th>
                  <th scope="col" style={{ fontSize: "18px" }}>INTERNAL CODE</th>
                  <th scope="col" style={{ fontSize: "18px" }}>Active Status</th>
                  <th scope="col" style={{ fontSize: "18px" }}>Purchase Description</th>
                  {/* <th scope="col" style={{ fontSize: "18px" }}>Cost Q</th>
                  <th scope="col" style={{ fontSize: "18px" }}>Precio Venta FOB $</th>
                  <th scope="col" style={{ fontSize: "18px" }}>Precio V USA $</th> */}
                  {/* <th scope="col" style={{ fontSize: "18px" }}>BOX PER PALLET</th>
                  <th scope="col" style={{ fontSize: "18px" }}>PALLETS</th>*/}
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
                    {/* <td style={{ fontSize: "18px" }}>{numberToCurrency(Number(item.art_precio_compra))}</td>
                    <td style={{ fontSize: "18px" }}>{numberToCurrency(Number(item.art_precio_costo))}</td>
                    <td style={{ fontSize: "18px" }}>{numberToCurrency(Number(item.art_precio_venta + costo_op_por_caja))}</td> */}
                    {/* <td style={{ fontSize: "18px" }}>{item.art_palet_caja}</td>
                    <td style={{ fontSize: "18px" }}>{Number(item.ord_cantidad / Number(item.art_palet_caja)).toFixed(1)}</td> */}
                    <td style={{ fontSize: "18px" }}>{item.ord_cantidad}</td>
                    <td style={{ fontSize: "18px" }}>{numberToCurrency(Number(item.ord_cantidad) * (Number(item.art_precio_venta + costo_op_por_caja)))}</td>

                  </tr>
                ))}

                <tr className="border-top">

                  <td style={{ fontSize: "18px" }} colSpan={4} className="text-right"></td>

                  {/* <td style={{ fontSize: "18px" }}>
                    {list.reduce((acc, item) => acc + Number(item.ord_cantidad / Number(item.art_palet_caja)), 0).toFixed(1)}
                  </td> */}
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
    </div>
  );
}

