// import React from "react";
import { Form, Formik } from "formik";
import { Base64 } from "js-base64";

import { ApproveUserSchema, initialValuesApprove } from "./helpers/_schemas";
import Field from "formInputs/Field";
// import Select from "formInputs/Select";
import { ListLoading } from "metronic/helpers/components/table/components/loading/ListLoading";

import { useNavigate, useParams } from "react-router-dom";
import { approveUser } from "./helpers/_requests";
import { toast } from "react-toastify";


const ApproveUser = () => {
    const navigate = useNavigate();

    // get the id from the url
    const params = useParams();
    const id = params.id;

    async function onSubmit(values: any, _formikHelpers: any) {
        //check email
        try {

            console.log(values)
            const ApproveValues = {
                usermame: values.usermame,
                password: Base64.encode(values.password),
                customer: Number(id)
            };
            await toast.promise(approveUser(Number(id), ApproveValues), {
                pending: "Aprobando usuario...",
                success: "Usuario aprobado exitosamente",
                error: "Error al aprobar usuario"
            });
            navigate(-1);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Formik
            validationSchema={ApproveUserSchema}
            initialValues={initialValuesApprove}
            onSubmit={onSubmit}
        >
            {(formik) => {
                return (
                    <Form placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        {import.meta.env.MODE === "development" && (JSON.stringify(formik.values))}
                        {import.meta.env.MODE === "development" && (JSON.stringify(formik.errors))}
                        <div className="px-10 pt-lg-10">
                            <form onSubmit={formik.handleSubmit}>
                                <div className="row mb-6 ms-0 px-0">
                                    <label className="col-sm-12 col-lg-2 col-form-label required fw-bold fs-6 mt-4">
                                        Usuario
                                    </label>
                                    <div className="col-lg-4 fv-row mt-4 ">
                                        <Field
                                            form={formik}
                                            name="usermame"
                                            placeholder="Usuario"
                                            type="text"
                                        />
                                    </div>
                                </div>
                                <div className="separator separator-dashed my-7"></div>
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
                                        Confirmar contraseña
                                    </label>
                                    <div className="col-lg-4 fv-row mt-4 ">
                                        <Field
                                            form={formik}
                                            name="confirm_password"
                                            placeholder="Confirmar contraseña"
                                            type="password"
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
                                        <span className="indicator-label">Aprobar</span>
                                        {(formik.isSubmitting) && (
                                            <span className="indicator-progress">
                                                Aprobando...{" "}
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
export { ApproveUser };
