import React from "react";
import { Form, Formik } from "formik";
import Field from "formInputs/Field";
import Label from "formInputs/Label";
import { useNavigate } from "react-router-dom";


export default function SelfClient() {


    const initialValues = {
        company_name: "",
        company_billing_address: "",
        company_delivery_address: "",
        company_contact: "",
        company_email: "",
        company_phone: "",
        company_job: "",
    };

    function onSubmit(values: any, _formikHelpers: any) {
        console.log(values);
    }

    return (
        <div >
            <div className="text-center">
                <h1>¡Bienvenido!</h1>
                <p>Por favor, ingrese los siguientes datos para registrarse</p >
            </div>
            <Formik
                // validationSchema={newCompanySchema}
                initialValues={initialValues}
                onSubmit={onSubmit}
            >
                {(formik) => (
                    <Form placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        <div className="px-10 py-lg-10 mt-10 card shadow ">
                            <form onSubmit={formik.handleSubmit}>
                                <div className="row mb-6 ms-0 px-0">
                                    <Label size="col-sm-12 col-lg-4">
                                        Nombre de la empresa
                                    </Label>
                                    <div className="col-lg-8 fv-row mt-4">
                                        <Field
                                            form={formik}
                                            name="name"
                                            placeholder="Nombre de la empresa"
                                            type="text"
                                        />
                                    </div>
                                    <Label size="col-sm-12 col-lg-4">
                                        Dirección de facturación
                                    </Label>
                                    <div className="col-lg-8 fv-row mt-4">
                                        <Field
                                            form={formik}
                                            name="company_billing_address"
                                            placeholder="Dirección de facturación"
                                            type="text"
                                        />
                                    </div>
                                    <Label size="col-sm-12 col-lg-4">
                                        Dirección de entrega
                                    </Label>
                                    <div className="col-lg-8 fv-row mt-4">
                                        <Field
                                            form={formik}
                                            name="company_delivery_address"
                                            placeholder="Dirección de entrega"
                                            type="text"
                                        />
                                    </div>
                                    <Label size="col-sm-12 col-lg-4">
                                        Contacto
                                    </Label>
                                    <div className="col-lg-8 fv-row mt-4">
                                        <Field
                                            form={formik}
                                            name="company_contact"
                                            placeholder="Contacto"
                                            type="text"
                                        />
                                    </div>
                                    <Label size="col-sm-12 col-lg-4">
                                        Puesto
                                    </Label>
                                    <div className="col-lg-8 fv-row mt-4">
                                        <Field
                                            form={formik}
                                            name="company_job"
                                            placeholder="Puesto"
                                            type="text"
                                        />
                                    </div>
                                    <Label size="col-sm-12 col-lg-4">
                                        Teléfono
                                    </Label>
                                    <div className="col-lg-8 fv-row mt-4">
                                        <Field
                                            form={formik}
                                            name="company_phone"
                                            placeholder="Teléfono"
                                            type="text"
                                        />
                                    </div>
                                    <Label size="col-sm-12 col-lg-4">
                                        Correo electrónico
                                    </Label>
                                    <div className="col-lg-8 fv-row mt-4">
                                        <Field
                                            form={formik}
                                            name="company_email"
                                            placeholder="Correo electrónico"
                                            type="text"
                                        />
                                    </div>
                            
                                </div>
                                <div className="text-center mt-10">
                                    <button type="submit" className="btn btn-primary btn-lg">¡Registrate!</button>
                                </div>
                            </form>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )

}