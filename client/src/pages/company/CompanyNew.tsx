import React from "react";
import { Form, Formik } from "formik";

import { initialValues, newCompanySchema } from "./helpers/_schemas";
import Field from "formInputs/Field";
import Select from "formInputs/Select";

import { useNavigate } from "react-router-dom";
import { createCompany } from "./helpers/_requests";
import { toast } from "react-toastify";

const NewDocumentWrappeer = () => {
  const navigate = useNavigate();
  async function onSubmit(values: any) {



    await toast.promise(createCompany(values), {
      pending: "Agregando empresa...",
      success: "Empresa agregada",
      error: "Error al agregar empresa",
    });

    navigate(-1);
  }

  return (
    <Formik
      validationSchema={newCompanySchema}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Form>
          <div className="px-10 pt-lg-10">
            <form onSubmit={formik.handleSubmit}>
              <div className="row mb-6 ms-0 px-0">
                <label className="col-sm-12 col-lg-2 col-form-label required fw-bold fs-6 mt-4">
                  Nombre
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
                  NIT
                </label>
                <div className="col-lg-4 fv-row mt-4">
                  <Field
                    form={formik}
                    name="nit"
                    placeholder="NIT"
                    type="text"
                  />
                </div>
                <label className="col-sm-12 col-lg-2 col-form-label required fw-bold fs-6 mt-4">
                  Dirección
                </label>
                <div className="col-lg-10 fv-row mt-4">
                  <Field
                    form={formik}
                    name="address"
                    placeholder="Dirección"
                    type="text"
                  />
                </div>
                <label className="col-sm-12 col-lg-2 col-form-label required fw-bold fs-6 mt-4">
                  Departamento
                </label>
                <div className="col-lg-4 fv-row mt-4">
                  <Select
                    form={formik}
                    name="adm_department_id"
                    source="departments"
                    placeholder="Departamento"
                    type="text"
                  />
                </div>
                <label className="col-sm-12 col-lg-2 col-form-label required fw-bold fs-6 mt-4">
                  Municipio
                </label>
                <div className="col-lg-4 fv-row mt-4">
                  <Select
                    form={formik}
                    name="adm_municipality_id"
                    source="municipality"
                    placeholder="Municipio"
                    optionsFilter={(item: any) => formik.values.adm_department_id === item.adm_department_id}
                    type="text"
                  />
                </div>
                <label className="col-sm-12 col-lg-2 col-form-label required fw-bold fs-6 mt-4">
                  Nombre representante legal
                </label>
                <div className="col-lg-4 fv-row mt-4">
                  <Field
                    form={formik}
                    name="legal_representative_name"
                    placeholder="Nombre representante legal"
                    type="text"
                  />
                </div>
                <label className="col-sm-12 col-lg-2 col-form-label required fw-bold fs-6 mt-4">
                  Apertura fiscal
                </label>
                <div className="col-lg-4 fv-row mt-4">
                  <Field
                    form={formik}
                    name="init_operations_date"
                    placeholder="Nombre representante legal"
                    type="date"
                  />
                </div>
                <label className="col-sm-12 col-lg-2 col-form-label required fw-bold fs-6 mt-4">
                  Número de teléfono
                </label>
                <div className="col-lg-4 fv-row mt-4">
                  <Field
                    form={formik}
                    name="phone"
                    placeholder="Número de teléfono"
                    type="text"
                  />
                </div>
                <label className="col-sm-12 col-lg-2 col-form-label required fw-bold fs-6 mt-4">
                  Régimen ISR
                </label>
                <div className="col-lg-4 fv-row mt-4">
                  <Select
                    form={formik}
                    name="adm_isr_regime_id"
                    source="isr-regime"
                    placeholder="Régimen ISR"
                    type="text"
                  />
                </div>
                <label className="col-sm-12 col-lg-2 col-form-label required fw-bold fs-6 mt-4">
                  Tipo de Empresa
                </label>
                <div className="col-lg-4 fv-row mt-4">
                  <Select
                    form={formik}
                    name="adm_company_type_id"
                    source="company-type"
                    placeholder="Tipo de Empresa"
                    type="text"
                  />
                </div>
                <label className="col-sm-12 col-lg-2 col-form-label required fw-bold fs-6 mt-4">
                  Moneda local
                </label>
                <div className="col-lg-4 fv-row mt-4">
                  <Field
                    form={formik}
                    name="currency"
                    placeholder="Moneda local"
                    type="text"
                  />
                </div>
                <label className="col-sm-12 col-lg-2 col-form-label required fw-bold fs-6 mt-4">
                  Nombre de sucursal principal
                </label>
                <div className="col-lg-4 fv-row mt-4">
                  <Field
                    form={formik}
                    name="branch"
                    placeholder="Nombre de sucursal principal"
                    type="text"
                  />
                </div>
              </div>

              <div className="text-right w-100 pt-15 d-flex justify-content-end">
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
      )}
    </Formik>
  );
};
export { NewDocumentWrappeer };
