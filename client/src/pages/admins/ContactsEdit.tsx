// import React from "react";
import { Form, Formik } from "formik";
// import { Base64 } from "js-base64";

import { EditContactSchema, initialValuesContact } from "./helpers/_schemas";
import Field from "formInputs/Field";
// import Select from "formInputs/Select";
import { ListLoading } from "metronic/helpers/components/table/components/loading/ListLoading";

import { useNavigate, useParams } from "react-router-dom";
import { getContact, updateContact } from "./helpers/_requests";
import { toast } from "react-toastify";
import { useCallback, useEffect, useState } from "react";


const EditWrapper = () => {
    const navigate = useNavigate();

    // get the id from the url
    const params = useParams();
    const id = params.contactId;

    const [isLoading, setIsLoading] = useState(true);
    const [values, setDocument] = useState<any>(initialValuesContact);


    const fetchDocument = useCallback(async () => {
        setIsLoading(true);
        const query = await getContact(id);
        
        setDocument({
            company_contact: query.data.con_nombre,
            company_email: query.data.con_email,
            company_phone: query.data.con_telefono_1,
            company_job: query.data.con_cargo,
            con_codigo: query.data.con_codigo
        });
        setIsLoading(false);
    }, [id]);

    useEffect(() => {
        fetchDocument();
    }, []);


    async function onSubmit(values: any, _formikHelpers: any) {
        //check email
        try {

            const updateValues = {
               company_contact: values.company_contact,
                company_email: values.company_email.toLowerCase(),
                company_phone: values.company_phone,
                company_job: values.company_job
                
            };

            await toast.promise(updateContact(Number(id), updateValues), {
                pending: "Actualizando contacto...",
                success: "Contacto actualizado exitosamente",
                error: "Error al actualizar contacto"
            });

            navigate(-1);
        } catch (error) {
            console.log(error);
        }
    }


    if (!id) return <div>Contact no encontrado</div>;

    if (isLoading || !values.con_codigo) {
        return <ListLoading />;
    }
    return (
        <Formik
            validationSchema={EditContactSchema}
            initialValues={values}
            onSubmit={onSubmit}
        >
            {(formik) => {
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
                                            name="company_contact"
                                            placeholder="Nombre"
                                            type="text"
                                        />
                                    </div>
                                    <label className="col-sm-12 col-lg-2 col-form-label required fw-bold fs-6 mt-4">
                                        Correo
                                    </label>
                                    <div className="col-lg-4 fv-row mt-4 ">
                                        <Field
                                            form={formik}
                                            name="company_email"
                                            placeholder="Correo"
                                            type="email"
                                        />
                                    </div>
                                    <label className="col-sm-12 col-lg-2 col-form-label required fw-bold fs-6 mt-4">
                                        Telefono
                                    </label>
                                    <div className="col-lg-4 fv-row mt-4 ">
                                        <Field
                                            form={formik}
                                            name="company_phone"
                                            placeholder="Telefono"
                                            type="text"
                                        />
                                    </div>
                                    <label className="col-sm-12 col-lg-2 col-form-label required fw-bold fs-6 mt-4">
                                        Puesto
                                    </label>
                                    <div className="col-lg-4 fv-row mt-4 ">
                                        <Field
                                            form={formik}
                                            name="company_job"
                                            placeholder="Puesto"
                                            type="text"
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
export { EditWrapper };
