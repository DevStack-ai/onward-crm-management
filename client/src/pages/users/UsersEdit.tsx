import React, { useCallback, useEffect, useState } from "react";
import { Form, Formik, FormikHelpers } from "formik";

import { EditCompanySchema, initialValues } from "./helpers/_schemas";
import Field from "formInputs/Field";
import Select from "formInputs/Select";
import { ListLoading } from "metronic/helpers/components/table/components/loading/ListLoading";
import { Base64 } from "js-base64";

import { useNavigate, useParams } from "react-router-dom";
import { checkAvailable, getUser, updateUser } from "./helpers/_requests";
import AssignCompanySection from "./components/CompanySection";

const EditDocumentWrappeer = () => {
  const navigate = useNavigate();

  const params = useParams();
  const [isLoading, setIslOading] = useState(true);
  const [document, setDocument] = useState(initialValues);
  const id = params.id;

  const fetchDocument = useCallback(async () => {
    setIslOading(true);
    const query = await getUser(id);
    setDocument(query.data);
    setIslOading(false);
  }, [id]);
  useEffect(() => {
    fetchDocument();
  }, []);

  async function onSubmit(values: any, _formikHelpers: any) {

    const createValues: any = {
      name: values.name,
      email: values.email,
      auth_profile_id: values.uth_profile_id,
    };

    if(values.password) {
      createValues["password"] = Base64.encode(values.password);
    }

    await updateUser(id, createValues);
    navigate(-1);
  }

  if (!id) return <div>Usuario no encontrado</div>;

  if (isLoading) {
    return <ListLoading />;
  }
  return (
    <Formik
      validationSchema={EditCompanySchema}
      initialValues={document}
      onSubmit={onSubmit}
    >
      {(formik) => {
        async function checkEmail(value: string) {
          const query = await checkAvailable("email", {
            email: value.toLowerCase(),
            id: id,
          });
          const exist = query.data.exist;
          if (exist) {
            formik.setErrors({ email: "Este correo no esta disponible" });
            return;
          }
        }
        return (
          <Form>
            {import.meta.env.DEV && JSON.stringify(formik.values)}
            {import.meta.env.DEV && JSON.stringify(formik.errors)}
            <div className="px-10 pt-lg-10">
              <form onSubmit={formik.handleSubmit}>
                <ul className="nav nav-tabs nav-line-tabs nav-line-tabs-2x mb-5 fs-6">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      data-bs-toggle="tab"
                      href="#general"
                    >
                      Información de usuario
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      data-bs-toggle="tab"
                      href="#companies"
                    >
                      Empresas
                    </a>
                  </li>

                </ul>
                <div className="tab-content" id="company-content">
                  <div
                    className="tab-pane fade active show"
                    id="general"
                    role="tabpanel"
                  >
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

                  </div>
                  <div className="tab-pane fade" id="companies" role="tabpanel">
                    <AssignCompanySection
                      userId={id}
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
                    disabled={formik.isSubmitting || !formik.isValid ||
                      !formik.touched}
                  >
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
              {(formik.isSubmitting) && <ListLoading />}
            </div>
          </Form>
        )
      }}
    </Formik>
  );
};
export { EditDocumentWrappeer };
