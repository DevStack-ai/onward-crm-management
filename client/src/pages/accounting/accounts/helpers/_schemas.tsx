
import * as yup from "yup";


export const NewSchema = yup.object().shape({
    name: yup.string().min(3, "Longitud minima 3 digitos").required("Campo obligatorio"),
    // parent_id: yup.string().required("Campo obligatorio"),
    code: yup.number().required("Campo obligatorio"),
})

export const initialValues = {
    name: "",
    parent_id: "",
    has_movement: false,
    code: "",
    add_bank_account: false,
    parent_code: "",
    act_bank_account_id: "",
}