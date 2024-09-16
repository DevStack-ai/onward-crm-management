
import { currencyFormat } from "definitions/regex";
import * as yup from "yup";


export const NewSchema = yup.object().shape({
    adm_branch_id: yup.number().required(),
    act_account_id: yup.number().required(),
    client_id: yup.number().required(),

    accounting_date: yup.string().required(),
    due_date: yup.string().required(),

    reference: yup.string().required(),
    serie: yup.string().optional(),
    folio: yup.string().optional(),

    details: yup.array().of(
        yup.object().shape({
            concept: yup.string().required(),
            price: yup.string().required("Campo requerido").matches(currencyFormat, { message: "Formato incorrecto" }),
            units: yup.number().required()
        })
    )


})

export const initialValues = {
    adm_branch_id: 0,
    act_account_id: 0,
    client_id: 0,

    accounting_date: "",
    due_date: "",

    reference: "",
    serie: "",
    folio: "",


    details: [{ concept: "", price: 0, units: 0 }]

}