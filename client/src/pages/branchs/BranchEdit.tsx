import React, { useCallback, useEffect, useState } from "react";
import { Form, Formik } from "formik";
import Select from "formInputs/Select";

import { initialValues, NewSchema } from "./helpers/_schemas";
import Field from "formInputs/Field";
import { ListLoading } from "metronic/helpers/components/table/components/loading/ListLoading";

import { useNavigate, useParams } from "react-router-dom";
import { get, update } from "./helpers/_requests";
import { toast } from "react-toastify";

const EditDocumentWrapper = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [isLoading, setIslOading] = useState(true);
  const [document, setDocument] = useState(initialValues);
  const id = params.id;

  const fetchDocument = useCallback(async () => {
    setIslOading(true);
    const query = await get(id);
    setDocument(query.data);
    setIslOading(false);
  }, [id]);

  useEffect(() => {
    fetchDocument();
  }, []);

  async function onSubmit(values: any) {
    const _updateFields = {
      adm_company_id: values.adm_company_id,
      name: values.name,
      address: values.address,
      phone: values.phone,
    };

    await toast.promise(update(id, _updateFields), {
      pending: "Editando sucursal...",
      success: "Sucursal editada",
      error: "Error al editar sucursal",
    });

    navigate(-1);
  }
  if (isLoading && !document.name) {
    return <ListLoading />;
  }
  return (
    <Formik
      validationSchema={NewSchema}
      initialValues={document}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Form>
          <div className="px-10 pt-lg-10">
            <form onSubmit={formik.handleSubmit}>
              <div className="row mb-6 ms-0 px-0">
                <label className="col-sm-12 col-lg-2 col-form-label required fw-bold fs-6 mt-4">
                  Empresa
                </label>
                <div className="col-lg-4 fv-row mt-4 ">
                  <Select
                    form={formik}
                    name="adm_company_id"
                    placeholder="Empresa"
                    type="text"
                    source="company"
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
                  Area
                </label>
                <div className="col-lg-4 fv-row mt-4">
                  <Field
                    form={formik}
                    name="area"
                    placeholder="Area"
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

          </div>
        </Form>
      )}
    </Formik>
  );
};
export { EditDocumentWrapper };
