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
import { numberToCurrency, currencyToNumber, fcurrencyToNumber } from "utils/index";

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
      client_id: data.client_id || 0,
      act_account_id: data.act_account_id || 0,

      details: data.details.map((d: any) => ({
        ...d,
        price: numberToCurrency(d.price),
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
      client_id: values.client_id || null,
      act_account_id: values.act_account_id || null,

      details: values.details.map((d: any) => ({
        ...d,
        price: currencyToNumber(d.price),
      })),
    };

    await toast.promise(update(id, payload), {
      pending: "Actualizando venta",
      success: "Venta actualizada",
      error: "Error al actualizar la Venta",
    });

    navigate(-1);
  }

  console.log(document)

  if (isLoading && !document.reference) {
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
            {import.meta.env.DEV && JSON.stringify(formik.values)}<br />
            {import.meta.env.DEV && JSON.stringify(formik.errors)}
            <div className="px-10 pt-lg-10" >
              <form onSubmit={formik.handleSubmit}>
                <div className="row mb-6 ms-0 px-0" >
                  <Label required size="col-sm-12 col-lg-2">
                    Referencia
                  </Label>
                  <div className="col-lg-4 fv-row mt-4 ">
                    <Field
                      form={formik}
                      name="reference"
                      placeholder="referencia"
                      type="text"
                    />
                  </div>
                  <Label required size="col-sm-12 col-lg-2">
                    Cliente
                  </Label>
                  <div className="col-lg-4 fv-row mt-4 ">
                    <Select
                      form={formik}
                      name="client_id"
                      placeholder="Cliente"
                      type="text"
                      source="clients"
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
                      autoSelect
                    />
                  </div>
                  <Label size="col-sm-12 col-lg-2">
                    Serie
                  </Label>
                  <div className="col-lg-4 fv-row mt-4 ">
                    <Field
                      form={formik}
                      name="serie"
                      placeholder="Serie"
                      type="text"
                    />
                  </div>
                  <Label size="col-sm-12 col-lg-2">
                    Folio
                  </Label>
                  <div className="col-lg-4 fv-row mt-4 ">
                    <Field
                      form={formik}
                      name="folio"
                      placeholder="Folio"
                      type="text"
                    />
                  </div>

                  <Label required size="col-sm-12 col-lg-2">
                    Fecha de Vencimiento
                  </Label>
                  <div className="col-lg-4 fv-row mt-4 ">
                    <Field
                      form={formik}
                      name="due_date"
                      placeholder="Fecha de Vencimiento"
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




                  <div className="separator separator-dashed my-7"></div>
                  <Label required size="col-sm-12 col-lg-2">
                    Detalle
                  </Label>
                  <div className="col-lg-10 fv-row mt-4 ">
                    <table className='table table-borderless align-middle fw-semibold'>
                      <thead>
                        <tr>
                          <th>Concepto</th>
                          <th>Unidades</th>
                          <th>Precio Unitario</th>
                          <th>Monto</th>
                        </tr>
                      </thead>
                      <tbody>
                        {formik.values.details.map((_: any, index: number) => (
                          <tr key={index}>
                            <td className="w-50">
                              <Field
                                form={formik}
                                name={`details.${index}.concept`}
                                placeholder={`Concepto ${index + 1}`}
                                type="text"
                              />
                            </td>
                            <td className="w-auto">
                              <Field
                                form={formik}
                                name={`details.${index}.units`}
                                placeholder={`Unidades ${index + 1}`}
                                type="number"
                              />
                            </td>
                            <td className="w-auto">
                              <Currency
                                form={formik}
                                name={`details.${index}.price`}
                                placeholder={`Precio Unitario ${index + 1}`}
                                type="number"
                              />
                            </td>
                            <td className="w-10">
                              <div className="form-control form-control-solid mb-3 mb-lg-0 w-100 justify-content-end d-flex">
                                {numberToCurrency(fcurrencyToNumber(formik.values.details[index].price) * formik.values.details[index].units)}
                              </div>
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
                                  { concept: "", price: 0, units: 0 },
                                ]);
                              }}
                            >
                              Agregar
                            </button>
                          </td>
                          <td></td>
                          <td></td>

                          <td>
                            <label className="col-form-label fw-bold fs-6 mt-4  w-100 justify-content-between d-flex">
                              Total:
                              <span >
                                {numberToCurrency(formik.values.details.map(d => fcurrencyToNumber(d.price) * d.units))}
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
              {/* {(formik.isSubmitting) && <ListLoading />} */}
            </div>
          </Form>
        )
      }}
    </Formik>
  );
};
export { EditDocumentWrapper };
