import React from "react";
import { Form, Formik } from "formik";

import { initialValues, newCompanySchema } from "./helpers/_schemas";
import Field from "formInputs/Field";
import { ListLoading } from "metronic/helpers/components/table/components/loading/ListLoading";

import { useNavigate } from "react-router-dom";
import { createProfile } from "./helpers/_requests";
import { defaultPermissions } from "../../redux/reducers/permissions/helpers";
const NewDocumentWrappeer = () => {
  const navigate = useNavigate();
  async function onSubmit(values: any, _formikHelpers: any) {
    await createProfile(values);
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
                <div className="col-lg-5 fv-row mt-4 ">
                  <Field
                    form={formik}
                    name="name"
                    placeholder="Nombre"
                    type="text"
                  />
                </div>
            
              </div>

              <div
                className="row mb-6 ms-0 px-0 pt-5"
                style={{ maxHeight: "60vh", overflowY: "scroll" }}
              >
                <div className="fv-row">
                  <label className="fs-5 fw-bold form-label mb-2">
                    Permisos
                  </label>

                  <div className="table-responsive">
                    <table className="table align-middle table-row-dashed fs-6 gy-5">
                      <tbody className="text-gray-600 fw-semibold">
                        <tr className="border-bottom">
                          <td className="text-gray-800">Todos</td>

                          <td>
                            <div className="d-flex">
                              <label className="form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  name="user_management_read"
                                />
                                <span className="form-check-label">Ver</span>
                              </label>

                              <label className="form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  name="user_management_create"
                                />
                                <span className="form-check-label">
                                  Crear
                                </span>
                              </label>

                              <label className="form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  name="user_management_edit"
                                />
                                <span className="form-check-label">
                                  Editar
                                </span>
                              </label>
                              <label className="form-check form-check-sm form-check-custom form-check-solid">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  name="user_management_eliminar"
                                />
                                <span className="form-check-label">
                                  Eliminar
                                </span>
                              </label>
                            </div>
                          </td>
                        </tr>
                        {defaultPermissions.map((
                          permission: { name: string; screen: string },
                          key: any,
                        ) => (
                          <tr key={key}>
                            <td className="text-gray-800">{permission.name}</td>

                            <td>
                              <div className="d-flex">
                                <label className="form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    name={`${permission.screen}_view`}
                                  />
                                  <span className="form-check-label">Ver</span>
                                </label>

                                <label className="form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    name={`${permission.screen}_create`}
                                  />
                                  <span className="form-check-label">
                                    Crear
                                  </span>
                                </label>

                                <label className="form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    name={`${permission.screen}_edit`}
                                  />
                                  <span className="form-check-label">
                                    Editar
                                  </span>
                                </label>
                                <label className="form-check form-check-sm form-check-custom form-check-solid">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    name={`${permission.screen}_delete`}
                                  />
                                  <span className="form-check-label">
                                    Eliminar
                                  </span>
                                </label>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
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
      )}
    </Formik>
  );
};
export { NewDocumentWrappeer };
