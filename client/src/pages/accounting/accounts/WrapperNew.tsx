import React from "react";
import { Form, Formik } from "formik";

import { initialValues, NewSchema } from "./helpers/_schemas";

import Field from "formInputs/Field";
import Select from "formInputs/Select";
import Check from "formInputs/Check";

import { useNavigate } from "react-router-dom";
import { create } from "./helpers/_requests";
import { toast } from "react-toastify";

const NewDocumentWrapper = () => {
  const navigate = useNavigate();
  async function onSubmit(values: any) {
    const payload = {
      name: values.name,
      parent_id: values.parent_id,
      code: values.code,
      has_movement: values.has_movement,
      act_bank_account_id: values.add_bank_account ? values.act_bank_account_id : null,
    }

    await toast.promise(create(payload), {
      pending: "Agregando cuenta contable...",
      success: "Cuenta contable agregada",
      error: "Error al agregar cuenta contable",
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
                    Cuenta Padre
                  </label>
                  <div className="col-lg-4 fv-row mt-4 ">
                    <Select
                      form={formik}
                      name="parent_id"
                      placeholder="Cuenta Padre"
                      type="text"
                      source="accounting-accounts"
                      onInputChange={(value: any) => {
                        debugger
                        formik.setFieldValue("parent_code", value.original.full_code);
                      }}
                    />
                  </div>

                  <label className="col-sm-12 col-lg-2 col-form-label required fw-bold fs-6 mt-4">
                    Codigo
                  </label>
                  <div className="col-lg-4 fv-row mt-4 ">
                    <div className="row mb-6 ms-0 ">
                      {formik.values.parent_id && <div className="col-3 px-0 pr-2">
                        <Field
                          form={formik}
                          name="parent_code"
                          placeholder="Codigo"
                          type="text"
                          disabled
                        />
                        <span className="text-muted" style={{ fontSize: "12px" }}>
                          Codigo de padre
                        </span>
                      </div>}
                      <div className="col px-0 ms-0 pr-3 ">
                        <Field
                          form={formik}
                          name="code"
                          placeholder="Codigo"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-12 col-lg-6 sep" />

                  <label className="col-sm-12 col-lg-2 col-form-label  fw-bold fs-6 mt-4">
                    ¿Tiene movimiento?
                  </label>
                  <div className="col-lg-4 fv-row mt-4 ">
                    <Check
                      form={formik}
                      name="has_movement"
                    />
                  </div>
                  <div className="col-sm-12 col-lg-6 sep" />
                  <label className="col-sm-12 col-lg-2 col-form-label  fw-bold fs-6 mt-4">
                    ¿Desea asignar una cuenta bancaria a esta cuenta?
                  </label>
                  <div className="col-lg-4 fv-row mt-4 ">
                    <Check
                      form={formik}
                      name="add_bank_account"
                    />
                  </div>
                  {formik.values.add_bank_account && (
                    <>
                      <label className="col-sm-12 col-lg-2 col-form-label  fw-bold fs-6 mt-4">
                        Cuenta bancaria
                      </label>
                      <div className="col-lg-4 fv-row mt-4 ">
                        <Select
                          form={formik}
                          name="act_bank_account_id"
                          placeholder="Cuenta Bancaria"
                          type="text"
                          source="bank-accounts"

                        />
                      </div>
                    </>)}
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
        )
      }}
    </Formik>
  );
};
export { NewDocumentWrapper };
