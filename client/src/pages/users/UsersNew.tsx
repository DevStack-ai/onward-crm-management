import React from "react";
import { Form, Formik } from "formik";
import { Base64 } from "js-base64";

import { initialValues, newCompanySchema } from "./helpers/_schemas";
import Field from "formInputs/Field";
import Select from "formInputs/Select";
import { ListLoading } from "metronic/helpers/components/table/components/loading/ListLoading";

import { useNavigate } from "react-router-dom";
import { checkAvailable, createuser } from "./helpers/_requests";


const NewDocumentWrappeer = () => {
  const navigate = useNavigate();
  async function onSubmit(values: any, _formikHelpers: any) {
    //check email

    const createValues = {
      name: values.name,
      email: values.email.toLowerCase(),
      auth_profile_id: values.auth_profile_id,
      password: Base64.encode(values.password),
    };
    await createuser(createValues);
    navigate(-1);
  }

  return (
    <Formik
      validationSchema={newCompanySchema}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {(formik) => {
          async function checkEmail(value: string) {
            const query = await checkAvailable("email", {
              email: value.toLowerCase(),
            });
            const exist = query.data.exist;
            if (exist) {
              formik.setErrors({ email: "Este correo no esta disponible" });
              return;
            }
          }
        return (
          <Form placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
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
                    Email
                  </label>
                  <div className="col-lg-4 fv-row mt-4">
                    <Field
                      form={formik}
                      name="email"
                      placeholder="email"
                      type="email"
                      onDebounce={checkEmail}
                    />
                  </div>

                  <label className="col-sm-12 col-lg-2 col-form-label required fw-bold fs-6 mt-4">
                    Perfil
                  </label>
                  <div className="col-lg-4 fv-row mt-4">
                    <Select
                      createOnScreen
                      form={formik}
                      name="auth_profile_id"
                      source="profiles"
                      placeholder="Perfil"
                      type="text"
                    />
                  </div>

                  <div className="separator my-4" />
                  <div className="row mb-6 ms-0 px-0">
                    <label className="col-sm-12 col-lg-2 col-form-label required fw-bold fs-6 mt-4">
                      Contraseña
                    </label>
                    <div className="col-lg-4 fv-row mt-4 ">
                      <Field
                        form={formik}
                        name="password"
                        placeholder="Contraseña"
                        type="password"
                      />
                    </div>
                    <label className="col-sm-12 col-lg-2 col-form-label required fw-bold fs-6 mt-4">
                      Confirmar Contraseña
                    </label>
                    <div className="col-lg-4 fv-row mt-4">
                      <Field
                        form={formik}
                        name="confirm_password"
                        placeholder="Confirmar Contraseña"
                        type="password"
                        isConfirmation
                      />
                    </div>
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
              {(formik.isSubmitting) && <ListLoading />}
            </div>
          </Form>
        )
      }}
    </Formik>
  );
};
export { NewDocumentWrappeer };
