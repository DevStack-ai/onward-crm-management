import React from "react";
import { Form, Formik } from "formik";

import { initialValues, NewSchema } from "./helpers/_schemas";
import Field from "formInputs/Field";

import { useNavigate } from "react-router-dom";
import { checkAvailable, create } from "./helpers/_requests";
import { toast } from "react-toastify";

interface Props {
  close?: () => void;
}

const NewDocumentWrapper = (props: Props) => {
  const navigate = useNavigate();
  async function onSubmit(values: any) {
    const payload = {
      name: values.name,
      nit: values.nit,
    }

    await toast.promise(create(payload), {
      pending: "Agregando proveedor...",
      success: "Proveedor agregado",
      error: "Error al agregar proveedor",
    });

    if (props.close) {
      props.close();
    } else {
      navigate(-1)
    }
  }


  return (
    <Formik
      validationSchema={NewSchema}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {(formik) => {
        async function checkNit(value: string) {
          const query = await checkAvailable("nit", { nit: value });
          const exist = query.data.exist;
          if (exist) {
            formik.setFieldError("nit", "El NIT ya está registrado");
            return;
          }
        }
        return (
          <Form>
            <div className="px-10 pt-lg-10">
              <form onSubmit={formik.handleSubmit}>
                <div className="row mb-6 ms-0 px-0">
                  <label className="col-sm-12 col-lg-2 col-form-label required fw-bold fs-6 mt-4">
                    NIT
                  </label>
                  <div className="col-lg-4 fv-row mt-4">
                    <Field
                      form={formik}
                      name="nit"
                      placeholder="NIT"
                      type="text"
                      onDebounce={checkNit}
                    />
                  </div>
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

                </div>

                <div className="text-right w-100 pt-15 d-flex justify-content-end">
                  <button
                    type="reset"
                    onClick={() => props.close ? props.close() : navigate(-1)}
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
