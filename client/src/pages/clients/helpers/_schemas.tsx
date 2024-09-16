
import * as yup from "yup";


export const newSchema = yup.object().shape({
    name: yup.string().required("El nombre es requerido"),
    nit: yup.string().required("El NIT es requerido"),
    address: yup.string().required("La dirección es requerida"),
    billing_address: yup.string().required("La dirección de facturación es requerida"),
    contact_name: yup.string().required("El nombre del contacto es requerido"),
    contact_phone: yup.string().required("El teléfono del contacto es requerido"),
    contact_email: yup.string().email("El correo del contacto es requerido"),
})

export const editSchema = yup.object().shape({
    name: yup.string().required("El nombre es requerido"),
    nit: yup.string().required("El NIT es requerido"),
    address: yup.string().required("La dirección es requerida"),
    billing_address: yup.string().required("La dirección de facturación es requerida"),
    contact_name: yup.string().required("El nombre del contacto es requerido"),
    contact_phone: yup.string().required("El teléfono del contacto es requerido"),
    contact_email: yup.string().email("El correo del contacto es requerido"),
})

export const initialValues = {
    name: "",
    nit: "",
    address: "",
    billing_address: "",
    contact_name: "",
    contact_phone: "",
    contact_email: "",
}