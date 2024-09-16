
import * as yup from "yup";


export const NewSchema = yup.object().shape({
    name: yup.string().min(3, "Longitud minima 3 digitos").required("Campo obligatorio"),
    nit: yup.string().min(3, "Longitud minima 3 digitos").required("Campo obligatorio"),
})

export const initialValues = {
    name: "",
    nit: ""
}