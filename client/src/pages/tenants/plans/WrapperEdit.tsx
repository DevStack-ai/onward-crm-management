import React, { useCallback, useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { initialValues, NewSchema } from "./helpers/_schemas";
import { ListLoading } from "metronic/helpers/components/table/components/loading/ListLoading";

import Field from "formInputs/Field";
import Select from "formInputs/Select";
import Label from "formInputs/Label";
import Currency from "formInputs/Currency";


import { useNavigate, useParams } from "react-router-dom";
import { get, update } from "./helpers/_requests";
import { toast } from "react-toastify";
import { numberToCurrency, currencyToNumber } from "utils/index";

import { NewDocumentWrapper as ProvicerCreate } from "../../providers/WrapperNew"
import { useKeypress } from "hooks/useEscape";


const EditDocumentWrapper = () => {
  const navigate = useNavigate();
  useKeypress("Escape", () => navigate(-1), [])

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
      price: numberToCurrency(data.price || 0)
    });
    setIslOading(false);
  }, [id]);

  useEffect(() => {
    fetchDocument();
  }, []);

  async function onSubmit(values: any) {
    const payload = {
      ...values,
      price: currencyToNumber(values.price)
    };

    await toast.promise(update(id, payload), {
      pending: "Actualizando registro...",
      success: "Registro actualizado",
      error: "Error actualizando registro",
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
            <div className="px-10 pt-lg-10" >
              <form onSubmit={formik.handleSubmit}>
                <div className="row mb-6 ms-0 px-0" >
                  <Label required size="col-sm-12 col-lg-2">
                    Nombre
                  </Label>
                  <div className="col-sm-12 col-lg-10 fv-row mt-4 ">
                    <Field
                      form={formik}
                      name="name"
                      placeholder="Nombre"
                      type="text"
                    />
                  </div>
                  <Label required size="col-sm-12 col-lg-2">
                    Precio
                  </Label>
                  <div className="col-lg-4 fv-row mt-4 ">
                    <Currency
                      form={formik}
                      name="price"
                      placeholder="Precio"
                      type="text"
                    />
                  </div>
                  <Label required size="col-sm-12 col-lg-2">
                    Maximo de empresas
                  </Label>
                  <div className="col-lg-4 fv-row mt-4 ">
                    <Field
                      form={formik}
                      name="max_companies"
                      placeholder="Maximo de empresas"
                      type="number"
                    />
                  </div>
                  <Label required size="col-sm-12 col-lg-2">
                    Tipo
                  </Label>
                  <div className="col-lg-4 fv-row mt-4 ">
                    <Select
                      form={formik}
                      name="plan_type_id"
                      placeholder="Tipo"
                      type="text"
                      source="plans/types"
                    />
                  </div>
                  <Label required size="col-sm-12 col-lg-2">
                    Periodo
                  </Label>
                  <div className="col-lg-4 fv-row mt-4 ">
                    <Select
                      form={formik}
                      name="plan_period_id"
                      placeholder="Periodo"
                      type="text"
                      source="plans/periods"
                    />
                  </div>
                </div>

                <div className="text-right w-100 d-flex justify-content-end">
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
export { EditDocumentWrapper };
