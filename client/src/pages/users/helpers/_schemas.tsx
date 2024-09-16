
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