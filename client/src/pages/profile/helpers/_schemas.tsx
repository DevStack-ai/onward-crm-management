
import * as yup from "yup";


export const newCompanySchema = yup.object().shape({
    name: yup.string().min(3, "Longitud minima 3 digitos").required("Campo obligatorio"),
    nit:  yup.string().min(3, "Longitud minima 3 digitos").required("Campo obligatorio"),
    address:  yup.string().min(3, "Longitud minima 3 digitos").required("Campo obligatorio"),
    adm_company_type_id: yup.string().required("Campo obligatorio").notOneOf([""]),
    adm_isr_regime_id: yup.string().required("Campo obligatorio").notOneOf([""]),
    phone: yup.string().min(3, "Longitud minima 3 digitos").required("Campo obligatorio"),
    init_operations_date: yup.date().required("Campo obligatorio"),
    legal_representative_name: yup.string().required("Campo obligatorio"),
    adm_municipality_id: yup.string().required("Campo obligatorio").notOneOf([""]),
    adm_department_id: yup.string().required("Campo obligatorio").notOneOf([""]),
    currency: yup.string().required("Campo obligatorio")
})

export const initialValues = {
    name: "",
    nit: "",
    address: "",
    adm_company_type_id: "",
    adm_isr_regime_id: "",
    phone: "",
    currency: "",
    init_operations_date: "",
    legal_representative_name: "",
    adm_municipality_id: "",
    adm_department_id: ""
}