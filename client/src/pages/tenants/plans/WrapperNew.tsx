import React from "react";
import { Form, Formik } from "formik";

import { initialValues, NewSchema } from "./helpers/_schemas";

import Field from "formInputs/Field";
import Select from "formInputs/Select";
import Label from "formInputs/Label"
import Currency from "formInputs/Currency"

import { useNavigate } from "react-router-dom";
import { create } from "./helpers/_requests";
import { toast } from "react-toastify";
import { currencyToNumber } from "utils/index";

import { useKeypress } from "hooks/useEscape";

const NewDocumentWrapper = () => {
  const navigate = useNavigate();

  useKeypress("Escape", () => navigate(-1), [])

  async function onSubmit(values: any) {
    const payload = {
      ...values,
      price: currencyToNumber(values.price)
    };

    await toast.promise(create(payload), {
      pending: "Creando registro...",
      success: "Registro creado",
      error: "Error creando registro",
    });

    navigate(-1);
  }


  return (
    <Formik
      validationSchema={NewSchema}
      initialValues={initialValues}
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
                    Nombre
                  </Label>
                  <div className="col-sm-12 col-lg-10 fv-row mt-4 ">
                    <Field
                      form={formik}
                      name="name"
                      placeholder="Nombre"
                      type="text"
                    />
                  </div>
                  <Label required size="col-sm-12 col-lg-2">
                    Precio
                  </Label>
                  <div className="col-lg-4 fv-row mt-4 ">
                    <Currency
                      form={formik}
                      name="price"
                      placeholder="Precio"
                      type="text"
                    />
                  </div>
                  <Label required size="col-sm-12 col-lg-2">
                    Maximo de empresas
                  </Label>
                  <div className="col-lg-4 fv-row mt-4 ">
                    <Field
                      form={formik}
                      name="max_companies"
                      placeholder="Maximo de empresas"
                      type="number"
                    />
                  </div>
                  <Label required size="col-sm-12 col-lg-2">
                    Tipo
                  </Label>
                  <div className="col-lg-4 fv-row mt-4 ">
                    <Select
                      form={formik}
                      name="plan_type_id"
                      placeholder="Tipo"
                      type="text"
                      source="plans/types"
                    />
                  </div>
                  <Label required size="col-sm-12 col-lg-2">
                    Periodo
                  </Label>
                  <div className="col-lg-4 fv-row mt-4 ">
                    <Select
                      form={formik}
                      name="plan_period_id"
                      placeholder="Periodo"
                      type="text"
                      source="plans/periods"
                    />
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
export { NewDocumentWrapper };
