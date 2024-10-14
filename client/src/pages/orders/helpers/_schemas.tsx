
import * as yup from "yup";


export const newCompanySchema = yup.object().shape({
    name: yup.string().min(3, "Longitud minima 3 digitos").required("Campo obligatorio"),
    email: yup.string().email("Formato invalido").min(3, "Longitud minima 3 digitos").required("Campo obligatorio"),
    auth_profile_id: yup.string().required("Campo obligatorio").notOneOf([""]),
    password: yup.string().required("Campo obligatorio"),
    confirm_password: yup.string()
        .required("Campo obligatorio")
        .oneOf([yup.ref('password'), ""], 'Las contraseñas no coinciden')
})
export const EditCompanySchema = yup.object().shape({
    name: yup.string().min(3, "Longitud minima 3 digitos").required("Campo obligatorio"),
    email: yup.string().email("Formato invalido").min(3, "Longitud minima 3 digitos").required("Campo obligatorio"),
    auth_profile_id: yup.string().required("Campo obligatorio").notOneOf([""]),
    password: yup.string().optional(),
    confirm_password: yup.string()
        .optional()
        .oneOf([yup.ref('password'), ""], 'Las contraseñas no coinciden')

})
export const initialValues = {
    name: "",
    email: "",
    auth_profile_id: "",
    password: "",
    confirm_password: "",

}

export const ApproveUserSchema = yup.object().shape({
    usermame: yup.string().min(3, "Longitud minima 3 digitos").required("Campo obligatorio"),
    password: yup.string().required("Campo obligatorio"),
    confirm_password: yup.string()
        .required("Campo obligatorio")
        .oneOf([yup.ref('password'), ""], 'Las contraseñas no coinciden')
})

export const initialValuesApprove = {
    usermame: "",
    password: "",
    confirm_password: "",
}


// contact

export const newContactSchema = yup.object().shape({
    company_contact: yup.string().min(3, "Longitud minima 3 digitos").required("Campo obligatorio"),
    company_email: yup.string().email("Formato invalido").min(3, "Longitud minima 3 digitos").required("Campo obligatorio"),
    company_phone: yup.string().min(3, "Longitud minima 3 digitos").required("Campo obligatorio"),
    company_job: yup.string().min(3, "Longitud minima 3 digitos").required("Campo obligatorio"),
})

export const EditContactSchema = yup.object().shape({
    company_contact: yup.string().min(3, "Longitud minima 3 digitos").required("Campo obligatorio"),
    company_email: yup.string().email("Formato invalido").min(3, "Longitud minima 3 digitos").required("Campo obligatorio"),
    company_phone: yup.string().min(3, "Longitud minima 3 digitos").required("Campo obligatorio"),
    company_job: yup.string().min(3, "Longitud minima 3 digitos").required("Campo obligatorio"),
})

export const initialValuesContact = {
    company_contact: "",
    company_email: "",
    company_phone: "",
    company_job: "",
}

// address

export const newAddressSchema = yup.object().shape({
    address_1: yup.string().min(3, "Longitud minima 3 digitos").required("Campo obligatorio"),
    address_2: yup.string().optional(),
    city: yup.string().min(3, "Longitud minima 3 digitos").required("Campo obligatorio"),
    state: yup.string().required("Campo obligatorio").notOneOf([""]),
    zip: yup.string().min(3, "Longitud minima 3 digitos").required("Campo obligatorio"),
    tipo: yup.string().required("Campo obligatorio").notOneOf([""]),
})

export const EditAddressSchema = yup.object().shape({
    address_1: yup.string().min(3, "Longitud minima 3 digitos").required("Campo obligatorio"),
    address_2: yup.string().optional(),
    city: yup.string().min(3, "Longitud minima 3 digitos").required("Campo obligatorio"),
    state: yup.string().required("Campo obligatorio").notOneOf([""]),
    zip: yup.string().min(3, "Longitud minima 3 digitos").required("Campo obligatorio"),
})

export const initialValuesAddress = {
    address_1: "",
    address_2: "",
    city: "",
    state: "",
    zip: "",
    tipo: ""
}
