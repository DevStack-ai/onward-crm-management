import React, { useCallback, useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { initialValues, NewSchema } from "./helpers/_schemas";
import { ListLoading } from "metronic/helpers/components/table/components/loading/ListLoading";

import Field from "formInputs/Field";
import Select from "formInputs/Select";
import Label from "formInputs/Label";

import { useNavigate, useParams } from "react-router-dom";
import { get, update } from "./helpers/_requests";
import { toast } from "react-toastify";
import {  currencyToNumber } from "utils/index";



const EditDocumentWrapper = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [isLoading, setIslOading] = useState(true);
  const [document, setDocument] = useState(initialValues);
  const id = params.id;

  const fetchDocument = useCallback(async () => {
    setIslOading(true);
    const { data } = await get(id);
    setDocument({
      ...document,
      ...data,
      adm_bank_id: data.adm_bank_id || 0,
      type_id: data.type_id || 0,
    });
    setIslOading(false);
  }, [id]);

  useEffect(() => {
    fetchDocument();
  }, []);

  async function onSubmit(values: any) {


    await toast.promise(update(id, values), {
      pending: "Actualizando cuenta bancaria...",
      success: "Cuenta bancaria actualizada",
      error: "No se pudo actualizar la cuenta bancaria",
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
      {(formik) => {

        return (
          <Form>
            {import.meta.env.DEV && JSON.stringify(formik.values)}
            {import.meta.env.DEV && JSON.stringify(formik.errors)}

            <div className="px-10 pt-lg-10">
              <form onSubmit={formik.handleSubmit}>
                <div className="row mb-6 ms-0 px-0">
                  <Label required size="col-sm-12 col-lg-2">
                    Banco
                  </Label>
                  <div className="col-lg-10 fv-row mt-4 ">
                    <Select
                      form={formik}
                      name="adm_bank_id"
                      placeholder="Banco"
                      type="text"
                      source="bank"
                    />
                  </div>

                  <Label required size="col-sm-12 col-lg-2">
                    Número de cuenta
                  </Label>
                  <div className="col-lg-4 fv-row mt-4 ">
                    <Field
                      form={formik}
                      name="account_number"
                      placeholder="Número de cuenta"
                      type="text"
                    />
                  </div>
                  <Label required size="col-sm-12 col-lg-2">
                    Tipo de cuenta
                  </Label>
                  <div className="col-lg-4 fv-row mt-4 ">
                    <Select
                      form={formik}
                      name="type_id"
                      placeholder="Tipo de cuenta"
                      type="text"
                      source="bank-accounts/types"
                    />
                  </div>
                  <Label required size="col-sm-12 col-lg-2">
                    Nombre de la cuenta
                  </Label>
                  <div className="col-lg-4 fv-row mt-4 ">
                    <Field
                      form={formik}
                      name="name"
                      placeholder="Nombre de la cuenta"
                      type="text"
                    />
                  </div>
                  <Label required size="col-sm-12 col-lg-2">
                    Prefijo
                  </Label>
                  <div className="col-lg-4 fv-row mt-4 ">
                    <Field
                      form={formik}
                      name="prefix"
                      placeholder="Prefijo"
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
              {/* {(formik.isSubmitting) && <ListLoading />} */}
            </div>
          </Form>
        )
      }}
    </Formik>
  );
};
export { EditDocumentWrapper };
