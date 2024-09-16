import React from "react";
import { Form, Formik } from "formik";

import { initialValues, newSchema } from "./helpers/_schemas";
import Field from "formInputs/Field";

import { useNavigate } from "react-router-dom";
import { create } from "./helpers/_requests";
import { toast } from "react-toastify";

interface Props {
  close?: (args: any) => void;
}
const NewDocumentWrappeer = (props: Props) => {
  const navigate = useNavigate();
  async function onSubmit(values: any, formikHelpers: any) {

    try {
      toast.loading("Agregando cliente...")
      const res = await create({
        ...values,
        nit: values.nit.replace(/-/g, "").replace(/ /g, ""),
      });
      toast.dismiss();
      toast.success("Cliente agregado correctamente");
      if (props.close) {
        props.close(res.data);
      } else {
        navigate(-1)
      }

    } catch (e: any) {
      //show error message
      toast.dismiss();

      toast.error(e.response.data.error)
      if (e.response.data.error.includes("nit")) {
        formikHelpers.setFieldError("nit", e.response.data.error)
      }
    }

  }

  return (
    <Formik
      validationSchema={newSchema}
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
                <div className="col-lg-4 fv-row mt-4">
                  <Field
                    form={formik}
                    name="address"
                    placeholder="Dirección"
                    type="text"
                  />
                </div>
                <label className="col-sm-12 col-lg-2 col-form-label required fw-bold fs-6 mt-4">
                  Dirección de facturación
                </label>
                <div className="col-lg-4 fv-row mt-4">
                  <Field
                    form={formik}
                    name="billing_address"
                    placeholder="Dirección de facturación"
                    type="text"
                  />
                </div>
                <label className="col-sm-12 col-lg-2 col-form-label required fw-bold fs-6 mt-4">
                  Nombre del contacto
                </label>
                <div className="col-lg-4 fv-row mt-4">
                  <Field
                    form={formik}
                    name="contact_name"
                    placeholder="Nombre del contacto"
                    type="text"
                  />
                </div>
                <label className="col-sm-12 col-lg-2 col-form-label required fw-bold fs-6 mt-4">
                  Teléfono del contacto
                </label>
                <div className="col-lg-4 fv-row mt-4">
                  <Field
                    form={formik}
                    name="contact_phone"
                    placeholder="Teléfono del contacto"
                    type="text"
                  />
                </div>
                <label className="col-sm-12 col-lg-2 col-form-label required fw-bold fs-6 mt-4">
                  Correo del contacto
                </label>
                <div className="col-lg-4 fv-row mt-4">
                  <Field
                    form={formik}
                    name="contact_email"
                    placeholder="Correo del contacto"
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
