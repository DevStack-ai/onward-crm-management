// import React from "react";
import { Form, Formik } from "formik";
// import { Base64 } from "js-base64";

import { initialValuesAddress, newAddressSchema } from "./helpers/_schemas";
import Field from "formInputs/Field";
import Select from "formInputs/Select";

// import Select from "formInputs/Select";
import { ListLoading } from "metronic/helpers/components/table/components/loading/ListLoading";

import { useNavigate, useParams } from "react-router-dom";
import { createAddress } from "./helpers/_requests";
import { toast } from "react-toastify";


const NewDocumentWrapper = () => {
    const navigate = useNavigate();

    // get the id from the url
    const params = useParams();
    const id = params.id;

    async function onSubmit(values: any, _formikHelpers: any) {
        //check email
        try {

            const createValues = {
                address_1: values.address_1,
                address_2: values.address_2,
                city: values.city,
                state: values.state,
                zip: values.zip,
                tipo: values.tipo,
                cliente: Number(id)
            };
            await toast.promise(createAddress(createValues), {
                pending: "Agregando dirección...",
                success: "Dirección agregada exitosamente",
                error: "Error al agregar dirección"
            });
            navigate(-1);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Formik
            validationSchema={newAddressSchema}
            initialValues={initialValuesAddress}
            onSubmit={onSubmit}
        >
            {(formik) => {
                return (
                    <Form placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        <div className="px-10 pt-lg-10">
                            <form onSubmit={formik.handleSubmit}>
                                <div className="row mb-6 ms-0 px-0">
                                    <label className="col-sm-12 col-lg-2 col-form-label required fw-bold fs-6 mt-4">
                                        Primera linea
                                    </label>
                                    <div className="col-lg-4 fv-row mt-4 ">
                                        <Field
                                            form={formik}
                                            name="address_1"
                                            placeholder="Dirección"
                                            type="text"
                                        />
                                    </div>
                                    <label className="col-sm-12 col-lg-2 col-form-label required fw-bold fs-6 mt-4">
                                        Segunda linea
                                    </label>
                                    <div className="col-lg-4 fv-row mt-4 ">
                                        <Field
                                            form={formik}
                                            name="address_2"
                                            placeholder="Dirección"
                                            type="text"
                                        />
                                    </div>
                                    <label className="col-sm-12 col-lg-2 col-form-label required fw-bold fs-6 mt-4">
                                        Ciudad
                                    </label>
                                    <div className="col-lg-4 fv-row mt-4 ">
                                        <Field
                                            form={formik}
                                            name="city"
                                            placeholder="Ciudad"
                                            type="text"
                                        />
                                    </div>
                                    <label className="col-sm-12 col-lg-2 col-form-label required fw-bold fs-6 mt-4">
                                        Estado
                                    </label>
                                    <div className="col-lg-4 fv-row mt-4 ">
                                        <Select
                                            form={formik}
                                            name="state"
                                            placeholder="Estado"
                                            type="text"
                                            source="states"
                                        />
                                    </div>
                                    <label className="col-sm-12 col-lg-2 col-form-label required fw-bold fs-6 mt-4">
                                        Código Postal
                                    </label>
                                    <div className="col-lg-4 fv-row mt-4 ">
                                        <Field
                                            form={formik}
                                            name="zip"
                                            placeholder="Código Postal"
                                            type="text"
                                        />
                                    </div>
                                    <label className="col-sm-12 col-lg-2 col-form-label required fw-bold fs-6 mt-4">
                                        Tipo de dirección
                                    </label>
                                    <div className="col-lg-4 fv-row mt-4 ">
                                        <Select
                                            form={formik}
                                            name="tipo"
                                            placeholder="Tipo"
                                            type="text"
                                            source="addresses/types"
                                        />
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
export { NewDocumentWrapper };
