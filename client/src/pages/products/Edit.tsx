import React, { useCallback, useEffect, useState } from "react";
import { Form, Formik } from "formik";

import { initialValues, NewSchhecma } from "./helpers/_schemas";
import Field from "formInputs/Field";
import TextArea from "formInputs/TextArea";
import Image from "formInputs/Image";
import File from "formInputs/File";

import Select from "formInputs/Select";
import { ListLoading } from "metronic/helpers/components/table/components/loading/ListLoading";

import { useNavigate, useParams } from "react-router-dom";
import { update, get } from "./helpers/_requests";
import { toast } from "react-toastify";


const EditDocument = () => {
  const navigate = useNavigate();
  const params = useParams();

  const id = params.id;
  const [isLoading, setIsloading] = useState(true);
  const [values, setDocument] = useState(initialValues);

  const fetchDocument = useCallback(async () => {
    setIsloading(true);
    const query = await get(id);
    setDocument(query.data);
    setIsloading(false);
  }, [id]);

  useEffect(() => { fetchDocument(); }, []);


  async function onSubmit(values: any, _formikHelpers: any) {

    const payload = {
      ...values
    };

    await toast.promise(update(id, payload), {
      pending: "Actualizando producto...",
      success: "Producto actualizado",
      error: "No se pudo actualizar el producto"
    });

    navigate(-1);
  }

  if (!id) return <div>Registro no encontrado</div>;


  if (isLoading) {
    return <ListLoading />;
  }

  return (
    <Formik
      validationSchema={NewSchhecma}
      initialValues={values}
      onSubmit={onSubmit}
    >
      {(formik) => {

        return (
          <Form placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <div className="px-10 pt-lg-10">
              {import.meta.env.MODE === "development" && (JSON.stringify(formik.values))}
              {import.meta.env.MODE === "development" && (JSON.stringify(formik.errors))}
              <form onSubmit={formik.handleSubmit}>
                <div className="row mb-6 ms-0 px-0" style={{
                  overflowY: "scroll",
                  maxHeight: "80vh",
                }}>

                  <div className="d-flex justify-content-around mb-3">
                    <Image form={formik} name="front_image" title="Frontal" />
                    <Image form={formik} name="back_image" title="Trasera" />
                    <File form={formik} name="ingredients" title="Ingredientes" />
                    <File form={formik} name="tag" title="Etiqueta" />
                    <File form={formik} name="zefra_tag" title="Etiqueta versión Zebra" />

                  </div>
                  <h2>  Información General</h2>

                  <label className="col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4">
                    Código Interno (SKU):
                  </label>
                  <div className="col-lg-4 fv-row mt-4 ">
                    <Field
                      form={formik}
                      name="sku"
                      placeholder="SKU"
                      type="text"
                    />
                  </div>
                  <label className="col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4">
                    Barcode:
                  </label>
                  <div className="col-lg-4 fv-row mt-4 ">
                    <Field
                      form={formik}
                      name="barcode"
                      placeholder="Barcode"
                      type="text"
                    />
                  </div>
                  <label className="col-sm-12 col-lg-1 col-form-label required fw-bold fs-6 mt-4">
                    Categoría:
                  </label>
                  <div className="col-lg-2 fv-row mt-4 ">
                    <Select
                      form={formik}
                      name="category"
                      placeholder="Categoría"
                      source="categories"
                    />
                  </div>
                  <label className="col-sm-12 col-lg-1 col-form-label required fw-bold fs-6 mt-4">
                    Proveedor:
                  </label>
                  <div className="col-lg-2 fv-row mt-4 ">
                    <Select
                      form={formik}
                      name="provider"
                      placeholder="Proveedor"
                      source="providers"
                    />
                  </div>
                  <label className="col-sm-12 col-lg-1 col-form-label required fw-bold fs-6 mt-4">
                    Marca:
                  </label>
                  <div className="col-lg-2 fv-row mt-4 ">
                    <Select
                      form={formik}
                      name="brand"
                      placeholder="Marca"
                      source="brands"
                    />
                  </div>
                  <label className="col-sm-12 col-lg-1 col-form-label required fw-bold fs-6 mt-4">
                    Pais:
                  </label>
                  <div className="col-lg-2 fv-row mt-4 ">
                    <Select
                      form={formik}
                      name="country"
                      placeholder="Pais"
                      source="countries"
                    />
                  </div>

                  <label className="col-sm-12 col-lg-2 col-form-label required fw-bold fs-6 mt-4">
                    Nombre:
                  </label>
                  <div className="col-lg-4 fv-row mt-4 ">
                    <Field
                      form={formik}
                      name="name"
                      placeholder="Nombre"
                      type="text"
                    />
                  </div>

                  <label className="col-sm-12 col-lg-2 col-form-label required fw-bold fs-6 mt-4">
                    Descripción:
                  </label>
                  <div className="col-lg-4 fv-row mt-4 ">
                    <Field
                      form={formik}
                      name="description"
                      placeholder="Descripción"
                      type="text"
                    />
                  </div>

                  <label className="col-sm-12 col-lg-2 col-form-label required fw-bold fs-6 mt-4">
                    Descripción para Packing List:
                  </label>
                  <div className="col-lg-10 fv-row mt-4 ">
                    <TextArea
                      form={formik}
                      rows={3}
                      name="packing_description"
                      placeholder="Descripción para Packing List"
                      type="text"
                    />
                  </div>


                  <label className="col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4">
                    Descripción del volumen:
                  </label>
                  <div className="col-lg-4 fv-row mt-4 ">
                    <Field
                      form={formik}
                      name="volume_description"
                      placeholder="Descripción del volumen"
                      type="text"
                    />
                  </div>
                  <label className="col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4">
                    ¿Es producto perecedero?
                  </label>
                  <div className="col-lg-4 fv-row mt-4 ">
                    <Select
                      form={formik}
                      name="is_perishable"
                      placeholder="¿Es producto perecedero?"
                      options={[
                        { name: "Si", id: "1" },
                        { name: "No", id: "0" },
                      ]}
                      source=""
                    />
                  </div>
                  <label className="col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4">
                    Tiempo de Vida:
                  </label>
                  <div className="col-lg-4 fv-row mt-4 ">
                    <Field
                      form={formik}
                      name="life_time"
                      placeholder="Tiempo de Vida"
                      type="text"
                    />
                  </div>
                  <div className="col-lg-12">
                  </div>
                  <label className="col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4">
                    Observaciones
                  </label>
                  <div className="col-lg-10 fv-row mt-4 ">
                    <TextArea
                      form={formik}
                      rows={3}
                      name="observations"
                      placeholder="Observaciones"
                      type="text"
                    />
                  </div>
                  <div className="col-lg-12">
                    <div className="separator my-7"></div>
                  </div>
                  <h2> Información Logística</h2>



                  <label className="col-sm-12 col-lg-2 col-form-label required fw-bold fs-6 mt-4">
                    Peso por caja (kg):
                  </label>
                  <div className="col-lg-4 fv-row mt-4 ">
                    <Field
                      form={formik}
                      name="box_weight"
                      placeholder="Peso por caja"
                      type="number"
                    />
                  </div>
                  <label className="col-sm-12 col-lg-2 col-form-label required fw-bold fs-6 mt-4">
                    Cajas por palet:
                  </label>
                  <div className="col-lg-4 fv-row mt-4 ">
                    <Field
                      form={formik}
                      name="boxes_per_pallet"
                      placeholder="Cajas por palet"
                      type="number"
                    />
                  </div>
                  <label className="col-sm-12 col-lg-2 col-form-label required fw-bold fs-6 mt-4">
                    Cajas por nivel:
                  </label>
                  <div className="col-lg-4 fv-row mt-4 ">
                    <Field
                      form={formik}
                      name="boxes_per_level"
                      placeholder="Cajas por nivel"
                      type="number"
                    />
                  </div>
                  <label className="col-sm-12 col-lg-2 col-form-label required fw-bold fs-6 mt-4">
                    Niveles por palet:
                  </label>
                  <div className="col-lg-4 fv-row mt-4 ">
                    <Field
                      form={formik}
                      name="levels_per_pallet"
                      placeholder="Niveles por palet"
                      type="number"
                    />
                  </div>
                  <label className="col-sm-12 col-lg-2 col-form-label required fw-bold fs-6 mt-4">
                    Altura ya en el palet (mts.):
                  </label>
                  <div className="col-lg-4 fv-row mt-4 ">
                    <Field
                      form={formik}
                      name="pallet_height"
                      placeholder="Altura ya en el palet"
                      type="number"
                    />
                  </div>
                  <label className="col-sm-12 col-lg-2 col-form-label required fw-bold fs-6 mt-4">
                    Unidad de Medida:
                  </label>
                  <div className="col-lg-4 fv-row mt-4 ">
                    <Select
                      form={formik}
                      name="unit"
                      placeholder="Unidad de Medida"
                      options={[{
                        name: "Pies",
                        id: "ft"
                      }]}
                      source=""
                    />
                  </div>
                  <label className="col-sm-12 col-lg-2 col-form-label required fw-bold fs-6 mt-4">
                    Largo del empaque (caja):
                  </label>
                  <div className="col-lg-4 fv-row mt-4 ">
                    <Field
                      form={formik}
                      name="box_length"
                      placeholder="Largo del empaque"
                      type="number"
                    />
                  </div>
                  <label className="col-sm-12 col-lg-2 col-form-label required fw-bold fs-6 mt-4">
                    Ancho del empaque (caja):
                  </label>
                  <div className="col-lg-4 fv-row mt-4 ">
                    <Field
                      form={formik}
                      name="box_width"
                      placeholder="Ancho del empaque"
                      type="number"
                    />
                  </div>
                  <label className="col-sm-12 col-lg-2 col-form-label required fw-bold fs-6 mt-4">
                    Alto del empaque (caja):
                  </label>
                  <div className="col-lg-4 fv-row mt-4 ">
                    <Field
                      form={formik}
                      name="box_height"
                      placeholder="Alto del empaque"
                      type="number"
                    />
                  </div>
                  <label className="col-sm-12 col-lg-2 col-form-label required fw-bold fs-6 mt-4">
                    Unidad de dimensiones empaque y estibación:
                  </label>
                  <div className="col-lg-4 fv-row mt-4 ">
                    <Select
                      form={formik}
                      name="unit_box"
                      placeholder="Unidad de dimensiones empaque y estibación"
                      options={[{
                        name: "centimetros",
                        id: "cm"
                      }]}
                      source=""
                    />
                  </div>
                  <label className="col-sm-12 col-lg-2 col-form-label required fw-bold fs-6 mt-4">
                    FDA NUMBER:
                  </label>
                  <div className="col-lg-4 fv-row mt-4 ">
                    <Field
                      form={formik}
                      name="fda_number"
                      placeholder="FDA NUMBER"
                      type="text"
                    />
                  </div>
                  <label className="col-sm-12 col-lg-2 col-form-label required fw-bold fs-6 mt-4">
                    FCE CID:
                  </label>
                  <div className="col-lg-4 fv-row mt-4 ">
                    <Field
                      form={formik}
                      name="fce_cid"
                      placeholder="FCE CID"
                      type="text"
                    />
                  </div>
                  <label className="col-sm-12 col-lg-2 col-form-label required fw-bold fs-6 mt-4">
                    HTS ITEM NUMBER:
                  </label>
                  <div className="col-lg-4 fv-row mt-4 ">
                    <Field
                      form={formik}
                      name="hts_item_number"
                      placeholder="HTS ITEM NUMBER"
                      type="text"
                    />
                  </div>
                  <label className="col-sm-12 col-lg-2 col-form-label required fw-bold fs-6 mt-4">
                    FDA PRODUCT CODE:
                  </label>
                  <div className="col-lg-4 fv-row mt-4 ">
                    <Field
                      form={formik}
                      name="fda_product_code"
                      placeholder="FDA PRODUCT CODE"
                      type="text"
                    />
                  </div>
                  <div className="col-lg-12">
                    <div className="separator my-7"></div>
                  </div>
                  <h2> Información Etíquetas</h2>

                  <label className="col-sm-12 col-lg-2 col-form-label  fw-bold fs-6 mt-4">
                    ¿Etiquetas?
                  </label>
                  <div className="col-lg-4 fv-row mt-4 ">
                    <Select
                      form={formik}
                      name="labels"
                      placeholder="¿Etiquetas?"
                      options={[
                        { name: "Si", id: "1" },
                        { name: "No", id: "0" },
                      ]}
                      source=""
                    />
                  </div>
                  <label className="col-sm-12 col-lg-2 col-form-label  fw-bold fs-6 mt-4">
                    Tamaño de etiquetas:
                  </label>
                  <div className="col-lg-4 fv-row mt-4 ">
                    <Field
                      form={formik}
                      name="labels_size"
                      placeholder="Tamaño de etiquetas"
                      type="text"
                    />
                  </div>

                  <div className="col-lg-12">
                    <div className="separator my-7"></div>
                  </div>
                  <h2> Compras</h2>

                  <label className="col-sm-12 col-lg-2 col-form-label required fw-bold fs-6 mt-4">
                    Moneda:
                  </label>
                  <div className="col-lg-4 fv-row mt-4 ">
                    <Select
                      form={formik}
                      name="currency"
                      placeholder="Moneda"
                      source="currencies"
                    />
                  </div>
                  <label className="col-sm-12 col-lg-2 col-form-label required fw-bold fs-6 mt-4">
                    Precio de Compra (Q):
                  </label>
                  <div className="col-lg-4 fv-row mt-4 ">
                    <Field
                      form={formik}
                      name="purchase_price_q"
                      placeholder="Precio de Compra"
                      type="number"
                    />
                  </div>
                  <label className="col-sm-12 col-lg-2 col-form-label required fw-bold fs-6 mt-4">
                    Precio de Compra ($):
                  </label>
                  <div className="col-lg-4 fv-row mt-4 ">
                    <Field
                      form={formik}
                      name="purchase_price_d"
                      placeholder="Precio de Compra"
                      type="number"
                    />
                  </div>
                  <label className="col-sm-12 col-lg-2 col-form-label required fw-bold fs-6 mt-4">
                    Precio de venta ($):
                  </label>
                  <div className="col-lg-4 fv-row mt-4 ">
                    <Field
                      form={formik}
                      name="sale_price_d"
                      placeholder="Precio de venta"
                      type="number"
                    />
                  </div>
                  <div className="col-lg-12">
                    <div className="separator my-7"></div>
                  </div>
                  <h2> Disponible para cambio</h2>


                  <label className="col-sm-12 col-lg-2 col-form-label  fw-bold fs-6 mt-4">
                    Cuenta Contable:
                  </label>
                  <div className="col-lg-4 fv-row mt-4 ">
                    <Field
                      form={formik}
                      name="accounting_account"
                      placeholder="Cuenta Contable"
                      type="text"
                    />
                  </div>
                  <label className="col-sm-12 col-lg-2 col-form-label  fw-bold fs-6 mt-4">
                    % de Participación:
                  </label>
                  <div className="col-lg-4 fv-row mt-4 ">
                    <Field
                      form={formik}
                      name="participation"
                      placeholder="% de Participación"
                      type="number"
                    />
                  </div>

                </div>
                <div className="text-right w-100 pt-lg-15 d-flex justify-content-end">
                  <button
                    type="reset"
                    onClick={() => navigate(-1)}
                    className="btn btn-light me-3"
                    data-kt-users-modal-action="cancel"
                    disabled={formik.isSubmitting}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      formik.handleSubmit();
                    }}
                    disabled={formik.isSubmitting || !formik.isValid ||
                      !formik.touched}
                  >
                    <span className="indicator-label">Editar</span>
                    {(formik.isSubmitting) && (
                      <span className="indicator-progress">
                        Editando...{" "}
                        <span className="spinner-border spinner-border-sm align-middle ms-2">
                        </span>
                      </span>
                    )}
                  </button>
                </div>
              </form>
              {(formik.isSubmitting) && <ListLoading />}
            </div>
          </Form>
        )
      }}
    </Formik>
  );
};
export { EditDocument };
