import React, { useCallback, useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { initialValues, NewSchema } from "./helpers/_schemas";
import { ListLoading } from "metronic/helpers/components/table/components/loading/ListLoading";

import Field from "formInputs/Field";
import Select from "formInputs/Select";
import Label from "formInputs/Label";
import Currency from "formInputs/Currency";


import { useNavigate, useParams } from "react-router-dom";
import { get, update } from "./helpers/_requests";
import { toast } from "react-toastify";
import { numberToCurrency, currencyToNumber } from "utils/index";

import { NewDocumentWrapper as ProvicerCreate } from "../../providers/WrapperNew"
import { useKeypress } from "hooks/useEscape";


const EditDocumentWrapper = () => {
  const navigate = useNavigate();
  useKeypress("Escape", () => navigate(-1), [])

  const params = useParams();
  const [isLoading, setIslOading] = useState(true);
  const [document, setDocument] = useState(initialValues);
  const id = params.id;

  const fetchDocument = useCallback(async () => {
    setIslOading(true);
    const { data } = await get(id);
      setDocument({
        ...document,
        ...data,
        adm_provider_id: data.adm_provider_id || 0,
        adm_purchase_document_type_id: data.adm_purchase_document_type_id || 0,
        adm_purchase_type_id: data.adm_purchase_type_id || 0,

        details: data.details.map((d: any) => ({
          ...d,
          amount: numberToCurrency(d.amount),
        })),
      });
    setIslOading(false);
  }, [id]);

  useEffect(() => {
    fetchDocument();
  }, []);

  async function onSubmit(values: any) {
    const payload = {
      ...values,
      adm_purchase_document_type_id: values.adm_purchase_document_type_id || null,
      adm_provider_id: values.adm_provider_id || null,
      adm_purchase_type_id: values.adm_purchase_type_id || null,
      details: values.details.map((d: any) => ({
        ...d,
        amount: currencyToNumber(d.amount),
      })),
    };

    await toast.promise(update(id, payload), {
      pending: "Actualizando compra",
      success: "Compra actualizada",
      error: "Error al actualizar la compra",
    });

    navigate(-1);
  }

  console.log(document)

  if (isLoading && !document.description) {
    return <ListLoading />;
  }
  return (
    <Formik
      validationSchema={NewSchema}
      initialValues={document}
      onSubmit={onSubmit}
    >
      {(formik) => {

        return (
          <Form>
            <div className="px-10 pt-lg-10" >
              <form onSubmit={formik.handleSubmit}>
                <div className="row mb-6 ms-0 px-0" >
                  <Label required size="col-sm-12 col-lg-2">
                    Descripcion
                  </Label>
                  <div className="col-sm-12 col-lg-10 fv-row mt-4 ">
                    <Field
                      form={formik}
                      name="description"
                      placeholder="Descripcion"
                      type="text"
                    />
                  </div>
                  <Label required size="col-sm-12 col-lg-2">
                    Cuenta
                  </Label>
                  <div className="col-lg-4 fv-row mt-4 ">
                    <Select
                      form={formik}
                      name="act_account_id"
                      placeholder="Cuenta"
                      type="text"
                      source="accounting-accounts"
                    />
                  </div>
                  <Label required size="col-sm-12 col-lg-2">
                    Sucursal
                  </Label>
                  <div className="col-lg-4 fv-row mt-4 ">
                    <Select
                      form={formik}
                      name="adm_branch_id"
                      placeholder="Sucursal"
                      type="text"
                      source="branchs"
                    />
                  </div>
                  <Label required size="col-sm-12 col-lg-2">
                    Fecha de Compra
                  </Label>
                  <div className="col-lg-4 fv-row mt-4 ">
                    <Field
                      form={formik}
                      name="date"
                      placeholder="Fecha de Compra"
                      type="date"
                    />
                  </div>
                  <Label required size="col-sm-12 col-lg-2">
                    Fecha de Contabilizacion
                  </Label>
                  <div className="col-lg-4 fv-row mt-4 ">
                    <Field
                      form={formik}
                      name="accounting_date"
                      placeholder="Fecha de Contabilizacion"
                      type="date"
                    />
                  </div>
                  <Label required size="col-sm-12 col-lg-2">
                    Tipo de registro
                  </Label>
                  <div className="col-lg-4 fv-row mt-4 ">
                    <Select
                      form={formik}
                      name="adm_purchase_type_id"
                      placeholder="Tipo de registro"
                      type="text"
                      source="accounting-purchase/types"
                    />
                  </div>
                  <Label required size="col-sm-12 col-lg-2">
                    Tipo de Documento
                  </Label>
                  <div className="col-lg-4 fv-row mt-4 ">
                    <Select
                      form={formik}
                      name="adm_purchase_document_type_id"
                      placeholder="Sin Documento"
                      type="text"
                      source="accounting-purchase/documents-types"
                    />
                  </div>
                  {formik.values.adm_purchase_document_type_id === 1 && (
                    <>
                      <Label required size="col-sm-12 col-lg-2">
                        Número de recibo
                      </Label>
                      <div className="col-lg-4 fv-row mt-4 ">
                        <Field
                          form={formik}
                          name="receipt_number"
                          placeholder="Número de recibo"
                          type="text"
                        />
                      </div>
                    </>
                  )}
                  {[2, 3].includes(formik.values.adm_purchase_document_type_id) && (
                    <>
                      <div className="separator separator-dashed my-7"></div>
                      <label className="col-sm-12 col-lg-12 col-form-label required fw-bold fs-6 mt-4">
                        Detalles de la factura
                      </label>
                      <Label required size="col-sm-12 col-lg-2">
                        Serie de factura
                      </Label>
                      <div className="col-lg-4 fv-row mt-4 ">
                        <Field
                          form={formik}
                          name="invoice_serie"
                          placeholder="Serie de factura"
                          type="text"
                        />
                      </div>
                      <Label required size="col-sm-12 col-lg-2">
                        Número de factura
                      </Label>
                      <div className="col-lg-4 fv-row mt-4 ">
                        <Field
                          form={formik}
                          name="invoice_number"
                          placeholder="Número de factura"
                          type="text"
                        />
                      </div>
                      <Label required size="col-sm-12 col-lg-2">
                        Proveedor
                      </Label>
                      <div className="col-lg-4 fv-row mt-4 ">
                        <Select
                          form={formik}
                          name="adm_provider_id"
                          placeholder="Proveedor"
                          type="text"
                          source="providers"
                          createOnScreen
                          createComponent={<ProvicerCreate />}
                        />
                      </div>
                    </>
                  )}
                  <div className="separator separator-dashed my-7"></div>
                  <Label required size="col-sm-12 col-lg-2">
                    Detalle
                  </Label>
                  <div className="col-lg-10 fv-row mt-4 ">
                    <table className='table table-borderless align-middle fw-semibold'>
                      <thead>
                        <tr>
                          <th>Concepto</th>
                          <th>Monto</th>
                        </tr>
                      </thead>
                      <tbody>
                        {formik.values.details.map((_: any, index: number) => (
                          <tr key={index}>
                            <td className="w-75">
                              <Field
                                form={formik}
                                name={`details.${index}.concept`}
                                placeholder={`Concepto ${index + 1}`}
                                type="text"
                              />
                            </td>
                            <td className="w-25">
                              <Currency
                                form={formik}
                                name={`details.${index}.amount`}
                                placeholder={`Monto ${index + 1}`}
                                type="number"
                              />
                            </td>
                            <td>
                              {index !== 0 && <button
                                className="btn btn-light-danger"
                                type="button"
                                onClick={() => {
                                  formik.setFieldValue(
                                    "details",
                                    formik.values.details.filter((_: any, i: number) => i !== index)
                                  );
                                }}
                              >
                                Eliminar
                              </button>}
                            </td>
                          </tr>
                        ))}
                        <tr>
                          <td >
                            <button
                              className="btn btn-light-primary"
                              type="button"
                              onClick={() => {
                                formik.setFieldValue("details", [
                                  ...formik.values.details,
                                  { concept: "", amount: 0 },
                                ]);
                              }}
                            >
                              Agregar
                            </button>
                          </td>
                          <td>
                            <label className="col-form-label fw-bold fs-6 mt-4  w-100 justify-content-between d-flex">
                              Total:
                              <span >
                                {numberToCurrency(formik.values.details.map(d => d.amount))}
                              </span>
                            </label>
                          </td>
                          <td></td>

                        </tr>
                      </tbody>
                    </table>
                  </div>

                </div>

                <div className="text-right w-100 d-flex justify-content-end">
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
                    disabled={formik.isSubmitting || !formik.isValid || !formik.touched}>
                    <span className="indicator-label">Agregar</span>
                    {(formik.isSubmitting) && (
                      <span className="indicator-progress">
                        Agregando...{" "}
                        <span className="spinner-border spinner-border-sm align-middle ms-2">
                        </span>
                      </span>
                    )}
                  </button>
                </div>
              </form>
              {/* {(formik.isSubmitting) && <ListLoading />} */}
            </div>
          </Form>
        )
      }}
    </Formik>
  );
};
export { EditDocumentWrapper };
