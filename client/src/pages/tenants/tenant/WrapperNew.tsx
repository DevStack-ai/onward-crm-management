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
import { currencyToNumber, numberToCurrency } from "utils/index";

import { NewDocumentWrapper as ProvicerCreate } from "../../providers/WrapperNew"
import { useKeypress } from "hooks/useEscape";

const NewDocumentWrapper = () => {
  const navigate = useNavigate();

  useKeypress("Escape", () => navigate(-1), [])

  async function onSubmit(values: any) {
    const payload = {
      ...values,
    };



    await toast.promise(create(payload), {
      pending: "Creando Tenant...",
      success: "Tenant Creado",
      error: "Error al crear Tenant",
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
                  <div className="col-sm-12 col-lg-4 fv-row mt-4 ">
                    <Field
                      form={formik}
                      name="name"
                      placeholder="Nombre"
                      type="text"
                    />
                  </div>
                  <Label required size="col-sm-12 col-lg-2">
                    Plan
                  </Label>
                  <div className="col-sm-12 col-lg-4 fv-row mt-4 ">
                    <Select
                      form={formik}
                      name="plan_id"
                      source="plans"
                    />
                  </div>

                  <div className="separator separator-dashed my-10"></div>
                  <Label required size="col-sm-12 col-lg-2">
                    Email para administrador
                  </Label>
                  <div className="col-sm-12 col-lg-10 fv-row mt-4 ">
                    <Field
                      form={formik}
                      name="email"
                      placeholder="Email"
                      type="email"
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
