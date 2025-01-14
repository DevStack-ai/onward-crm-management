import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getOrder } from '../../orders/helpers/_requests';
import Loading from '../store/components/Loading';
import { OrderProduct } from '../store/helpers/_types';
import { toast } from 'react-toastify';
import { downloadOrder } from '../store/helpers/_requests';
import { numberToCurrency } from '../../../utils';

import moment from 'moment';
import { getTag } from '../../orders/helpers/_columns';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

export function DetailsOrder() {

  // get the id from the url
  const navigate = useNavigate();
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


    setDocument(order);
    setList(details)
    setIsLoading(false);
  }, [id]);

  useEffect(() => {
    fetchDocument();
  }, []);




  const [text, color] = getTag(values?.ord_situacion);


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
                        <th scope="col" style={{ fontSize: "25px" }}>Precio final </th>
                        <th scope="col" style={{ fontSize: "25px" }}>Total</th>
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
                                <div style={{ fontSize: "25px" }} >{(item.ord_cantidad || 0)}</div>
                              </div>
                            </div>
                          </td>
                          <td style={{ fontSize: "25px" }}>{numberToCurrency(Number(item.ord_precio))}</td>
                          <td style={{ fontSize: "25px" }}>{numberToCurrency((item.ord_cantidad !== undefined ? item.ord_cantidad : 0) * item.ord_precio)}</td>


                        </tr>
                      ))}

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

          </div>
        </Tab>

      </Tabs>
    </div>
  );
}

