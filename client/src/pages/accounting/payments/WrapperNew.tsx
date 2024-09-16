import React from "react";
import { Form, Formik } from "formik";

import { initialValues, NewSchema } from "./helpers/_schemas";

import Field from "formInputs/Field";
import Select from "formInputs/Select";
import Label from "formInputs/Label"
import Check from "formInputs/Check"
import Currency from "formInputs/Currency"

import { useNavigate } from "react-router-dom";
import { create } from "./helpers/_requests";
import { toast } from "react-toastify";
import { currencyToNumber } from "utils/index";

const NewDocumentWrapper = () => {
  const navigate = useNavigate();

  const urlParams = new URLSearchParams(window.location.search);
  const purchase_id = urlParams.get('purchase_id');
  console.log("purchase", purchase_id)

  async function onSubmit(values: any) {

    const payload = {
      ...values,
      subtotal: currencyToNumber(values.subtotal),
      tax: values.include_iva ? currencyToNumber(values.tax) : 0,
      total: values.include_iva ? currencyToNumber(values.total) : currencyToNumber(values.subtotal),
    }


    await toast.promise(create(payload), {
      pending: "Agregando pago...",
      success: "pago agregada",
      error: "Error al agregar pago",
    });

    navigate(-1);
  }


  return (
    <Formik
      validationSchema={NewSchema}
      initialValues={{ ...initialValues, act_purchase_id: Number(purchase_id ?? 0) }}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Form>
            {import.meta.env.DEV && JSON.stringify(formik.values)}
            {import.meta.env.DEV && JSON.stringify(formik.errors)}

            <div className="px-10 pt-lg-10" >
              <form onSubmit={formik.handleSubmit}>
                <div className="row mb-6 ms-0 px-0" >
                  <Label required size="col-sm-12 col-lg-2">
                    Cuenta bancaria
                  </Label>
                  <div className="col-lg-10 fv-row mt-4 ">
                    <Select
                      form={formik}
                      name="act_bank_account_id"
                      placeholder="Cuenta bancaria"
                      type="text"
                      source="bank-accounts"
                    />
                  </div>
                  {!purchase_id && <>
                    <Label required size="col-sm-12 col-lg-2">
                      Compra
                    </Label>
                    <div className="col-lg-10 fv-row mt-4 ">
                      <Select
                        form={formik}
                        name="act_purchase_id"
                        placeholder="Compra"
                        type="text"
                        source="accounting-purchase"
                      />
                    </div>
                  </>}
                  <Label required size="col-sm-12 col-lg-2">
                    Notas
                  </Label>
                  <div className="col-lg-4 fv-row mt-4 ">
                    <Field
                      form={formik}
                      name="notes"
                      placeholder="Notas"
                      type="text"
                    />
                  </div>
                  <Label required size="col-sm-12 col-lg-2">
                    Referencia
                  </Label>
                  <div className="col-lg-4 fv-row mt-4 ">
                    <Field
                      form={formik}
                      name="reference_number"
                      placeholder="Referencia"
                      type="text"
                    />
                  </div>
                  <Label required size="col-sm-12 col-lg-2">
                    Metodo de Pago
                  </Label>
                  <div className="col-lg-4 fv-row mt-4 ">
                    <Select
                      form={formik}
                      name="adm_payment_method_id"
                      placeholder="Metodo de Pago"
                      type="text"
                      source="payments/methods"
                    />
                  </div>
                  <Label required size="col-sm-12 col-lg-2">
                    Fecha de Pago
                  </Label>
                  <div className="col-lg-4 fv-row mt-4 ">
                    <Field
                      form={formik}
                      name="payment_date"
                      placeholder="Fecha de Pago"
                      type="date"
                    />
                  </div>
                  {formik.values.adm_payment_method_id === 3 && <>
                    <Label required size="col-sm-12 col-lg-2">
                      Numero de Cheque
                    </Label>
                    <div className="col-lg-4 fv-row mt-4 ">
                      <Field
                        form={formik}
                        name="check_number"
                        placeholder="Numero de Cheque"
                        type="text"
                      />
                    </div>
                    <Label required size="col-sm-12 col-lg-2">
                      Nombre de Cheque
                    </Label>
                    <div className="col-lg-4 fv-row mt-4 ">
                      <Field
                        form={formik}
                        name="check_name"
                        placeholder="Nombre de Cheque"
                        type="text"
                      />
                    </div>
                  </>}

                  <div className="separator pt-4"></div>
                  <Label required size="col-sm-12 col-lg-2">
                    {!formik.values.include_iva ? "Total" : "Subtotal"}
                  </Label>
                  <div className="col-lg-4 fv-row mt-4 ">
                    <Currency
                      form={formik}
                      name="subtotal"
                      placeholder="Monto"
                      type="text"
                    />
                  </div>
                  <Label required size="col-sm-12 col-lg-2">
                    Incluye IVA?
                  </Label>
                  <div className="col-lg-4 fv-row mt-4 ">
                    <Check
                      form={formik}
                      name="include_iva"
                      placeholder="Incluye IVA?"
                      type="text"
                      source="boolean"
                    />
                  </div>
                  {formik.values.include_iva && <>
                    <Label required size="col-sm-12 col-lg-2">
                      IVA
                    </Label>
                    <div className="col-lg-4 fv-row mt-4 ">
                      <Currency
                        form={formik}
                        name="tax"
                        placeholder="IVA"
                        type="text"
                        disabled
                        value={(typeof currencyToNumber(formik.values.subtotal) === "number") ? currencyToNumber(formik.values.subtotal) as any * 0.12 : 0}
                      />
                    </div>
                    <div className="col-sm-12 col-lg-6">
                    </div>
                    <Label required size="col-sm-12 col-lg-2">
                      Total
                    </Label>
                    <div className="col-lg-4 fv-row mt-4 ">
                      <Currency
                        form={formik}
                        name="total"
                        placeholder="Total"
                        type="text"
                        disabled
                        value={(typeof currencyToNumber(formik.values.subtotal) === "number") ? currencyToNumber(formik.values.subtotal) as any * 1.12 : 0}

                      />
                    </div>
                  </>}
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
          </Form >
        )
      }}
    </Formik >
  );
};
export { NewDocumentWrapper };
