import React, { useCallback, useEffect, useState } from "react";
import { Form, Formik } from "formik";

import { initialValues, newCompanySchema } from "./helpers/_schemas";
import Field from "formInputs/Field";
import Select from "formInputs/Select";
import { ListLoading } from "metronic/helpers/components/table/components/loading/ListLoading";

import { useNavigate, useParams } from "react-router-dom";
import { getCompany, updateCompany } from "./helpers/_requests";
import moment from "moment";
import AccountantsSection from "./components/AccountantsSection";

const EditDocumentWrappeer = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [isLoading, setIslOading] = useState(true);
  const [document, setDocument] = useState(initialValues);
  const id = params.id;

  const fetchDocument = useCallback(async () => {
    setIslOading(true);
    const query = await getCompany(id);
    setDocument(query.data);
    setIslOading(false);
  }, [id]);

  useEffect(() => {
    fetchDocument();
  }, []);

  async function onSubmit(values: any) {
    const _updateFields = {
      name: values.name,
      nit: values.nit,
      address: values.address,
      adm_company_type_id: values.adm_company_type_id,
      adm_isr_regime_id: values.adm_isr_regime_id,
      phone: values.phone,
      currency: values.currency,
      init_operations_date: moment(values.init_operations_date).format("YYYY-MM-DD",),
      legal_representative_name: values.legal_representative_name,
      adm_municipality_id: values.adm_municipality_id,
      adm_department_id: values.adm_department_id,
    };

    await updateCompany(id, _updateFields);
    navigate(-1);
  }
  if (!id) return null;

  if (isLoading) {
    return <ListLoading />;
  }
  return (
    <Formik
      validationSchema={newCompanySchema}
      initialValues={document}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Form>
          <div className="px-10 pt-lg-10">
            <form onSubmit={formik.handleSubmit}>
              <ul className="nav nav-tabs nav-line-tabs nav-line-tabs-2x mb-5 fs-6">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    data-bs-toggle="tab"
                    href="#general"
                  >
                    Información de la Empresa
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-bs-toggle="tab"
                    href="#users"
                  >
                    Contadores
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
                        optionsFilter={(item: any) =>
                          formik.values.adm_department_id ===
                          item.adm_department_id}
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

                  </div>
                </div>
                <div className="tab-pane fade" id="users" role="tabpanel">
                  <AccountantsSection
                    companyId={id}
                  />
                </div>
                <div className="text-right w-100 pt-15 d-flex justify-content-end">
                  <button
                    type="reset"
                    onClick={() => navigate(`/company/${id}/details`)}
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
              </div>

            </form>
            {(formik.isSubmitting || isLoading) && <ListLoading />}
          </div>
        </Form>
      )}
    </Formik>
  );
};
export { EditDocumentWrappeer };
