import React from "react";
import { Form, Formik } from "formik";
import Field from "formInputs/Field";
import Label from "formInputs/Label";
import Select from "formInputs/Select";
import { SelfClientInitialValues, SelfClientSchema } from "./helpers/_schema";
import { createCustomer } from "./helpers/_requests";
import { toast } from "react-toastify";


export default function SelfClient() {

    const [isSubmitting, setIsSubmitting] = React.useState(false);



    async function onSubmit(values: any, _formikHelpers: any) {
        try {

            setIsSubmitting(true)
            await createCustomer(values)
            setIsSubmitting(false)
            toast.success("¡Registro exitoso!")
            //reload
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div >
            <div className="text-center">
                <h1>¡Bienvenido!</h1>
                <p>Por favor, ingrese los siguientes datos para registrarse</p >
            </div>
            <Formik
                validationSchema={SelfClientSchema}
                initialValues={SelfClientInitialValues}
                onSubmit={onSubmit}
            >
                {(formik) => (
                    <Form placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        {import.meta.env.MODE === "development" && (
                            <pre>{JSON.stringify(formik.errors, null, 2)}</pre>
                        )}
                        <div className="px-10 py-lg-5 card shadow ">
                            <form onSubmit={formik.handleSubmit}>
                                <div className="row mb-6 ms-0 px-0">
                                    <Label size="col-sm-12 col-lg-4" required>
                                        Nombre de la empresa
                                    </Label>
                                    <div className="col-lg-8 fv-row mt-4">
                                        <Field
                                            form={formik}
                                            name="company_name"
                                            placeholder="Nombre de la empresa"
                                            type="text"
                                        />
                                    </div>
                                    <div className="mt-5">
                                        <h4 className="text-muted">
                                            Dirección Facturación
                                        </h4>
                                        <hr />
                                    </div>
                                    <Label size="col-sm-12 col-lg-4" required>
                                        Dirección primera linea
                                    </Label>
                                    <div className="col-lg-8 fv-row mt-4">
                                        <Field
                                            form={formik}
                                            name="company_billing_address_1"
                                            placeholder="Dirección de facturación"
                                            type="text"
                                        />
                                    </div>
                                    <Label size="col-sm-12 col-lg-4">
                                        Dirección segunda linea
                                    </Label>
                                    <div className="col-lg-8 fv-row mt-4">
                                        <Field
                                            form={formik}
                                            name="company_billing_address_2"
                                            placeholder="Dirección de facturación"
                                            type="text"
                                        />
                                    </div>
                                    <Label size="col-sm-12 col-lg-4" required>
                                        Ciudad
                                    </Label>
                                    <div className="col-lg-8 fv-row mt-4">
                                        <Field
                                            form={formik}
                                            name="company_billing_city"
                                            placeholder="Ciudad"
                                            type="text"
                                        />
                                    </div>
                                    <Label size="col-sm-12 col-lg-4" required>
                                        Estado
                                    </Label>
                                    <div className="col-lg-8 fv-row mt-4">
                                        <Select
                                            form={formik}
                                            name="company_billing_state"
                                            placeholder="Estado"
                                            type="text"
                                            source="states"
                                        />
                                    </div>
                                    <Label size="col-sm-12 col-lg-4" required>
                                        Código postal
                                    </Label>
                                    <div className="col-lg-8 fv-row mt-4">
                                        <Field
                                            form={formik}
                                            name="company_billing_zip"
                                            placeholder="Código postal"
                                            type="text"
                                        />
                                    </div>
                                    <div className="mt-5">
                                        <h4 className="text-muted">
                                            Dirección Entrega
                                        </h4>
                                        <hr />
                                    </div>
                                    <Label size="col-sm-12 col-lg-4" required>
                                        Dirección primera linea
                                    </Label>
                                    <div className="col-lg-8 fv-row mt-4">
                                        <Field
                                            form={formik}
                                            name="company_delivery_address_1"
                                            placeholder="Dirección de entrega"
                                            type="text"
                                        />
                                    </div>
                                    <Label size="col-sm-12 col-lg-4">
                                        Dirección segunda linea
                                    </Label>
                                    <div className="col-lg-8 fv-row mt-4">
                                        <Field
                                            form={formik}
                                            name="company_delivery_address_2"
                                            placeholder="Dirección de entrega"
                                            type="text"
                                        />
                                    </div>
                                    <Label size="col-sm-12 col-lg-4" required>
                                        Estado
                                    </Label>
                                    <div className="col-lg-8 fv-row mt-4">
                                        <Select
                                            form={formik}
                                            name="company_state"
                                            placeholder="Estado"
                                            type="text"
                                            source="states"
                                        />
                                    </div>
                                    <Label size="col-sm-12 col-lg-4" required>
                                        Ciudad
                                    </Label>
                                    <div className="col-lg-8 fv-row mt-4">
                                        <Field
                                            form={formik}
                                            name="company_city"
                                            placeholder="Ciudad"
                                            type="text"
                                        />
                                    </div>

                                    <Label size="col-sm-12 col-lg-4" required>
                                        Código postal
                                    </Label>
                                    <div className="col-lg-8 fv-row mt-4">
                                        <Field
                                            form={formik}
                                            name="company_zip"
                                            placeholder="Código postal"
                                            type="text"
                                        />
                                    </div>
                                    <div className="mt-5">
                                        <h4 className="text-muted">
                                            Contacto
                                        </h4>
                                        <hr />
                                    </div>
                                    <Label size="col-sm-12 col-lg-4" required>
                                        Nombre de contacto
                                    </Label>
                                    <div className="col-lg-8 fv-row mt-4">
                                        <Field
                                            form={formik}
                                            name="company_contact"
                                            placeholder="Contacto"
                                            type="text"
                                        />
                                    </div>
                                    <Label size="col-sm-12 col-lg-4" required>
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
                                    <Label size="col-sm-12 col-lg-4" required>
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
                                    <Label size="col-sm-12 col-lg-4" required>
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
                                    {!isSubmitting && <button type="button" className="btn btn-primary btn-lg" onClick={() => formik.handleSubmit()}>
                                        ¡Registrate!
                                    </button>}
                                    {isSubmitting && <button type="button" className="btn btn-primary btn-lg" disabled>Registrando...
                                        <span className="spinner-border spinner-border-sm ms-2" role="status" aria-hidden="true"></span>
                                    </button>}
                                </div>
                            </form>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )

}