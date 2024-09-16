
import { currencyFormat } from "definitions/regex";
import * as yup from "yup";


export const NewSchema = yup.object().shape({
    act_purchase_id: yup.number().required("Requerido"),
    adm_payment_method_id: yup.number().required("Requerido"),
    act_bank_account_id: yup.number().required("Requerido"),
    notes: yup.string().nullable(),
    check_number: yup.string().nullable(),
    check_name: yup.string().nullable(),
    reference_number: yup.string().nullable(),

    payment_date: yup.string().required("Requerido"),
    subtotal: yup.string().matches(currencyFormat, "Formato inválido").required("Requerido"),


})

export const initialValues = {
    // const act_purchase_id = req.body.act_purchase_id
    // const adm_payment_method_id = req.body.adm_payment_method_id

    // //optional fields
    // const notes = req.body.notes
    // const check_number = req.body.check_number
    // const check_name = req.body.check_name
    // const reference_number = req.body.reference_number

    // //requiered fields
    // const payment_date = req.body.payment_date
    // const subtotal = req.body.subtotal
    // const tax = req.body.tax
    // const total = req.body.total

    act_bank_account_id: 0,
    act_purchase_id: 0,
    adm_payment_method_id: 0,

    notes: "",
    check_number: "",
    check_name: "",
    reference_number: "",

    payment_date: "",
    subtotal: "",
  
    include_iva: false

}