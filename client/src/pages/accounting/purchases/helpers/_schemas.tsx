
import { currencyFormat } from "definitions/regex";
import * as yup from "yup";


export const NewSchema = yup.object().shape({
    adm_branch_id: yup.number().required("Campo requerido"),
    act_account_id: yup.number().required("Campo requerido"),
    adm_purchase_type_id: yup.number().required("Campo requerido"),
    adm_purchase_document_type_id: yup.number().optional(),

    accounting_date: yup.string().required("Campo requerido"),
    date: yup.string().required("Campo requerido"),
    description: yup.string().required("Campo requerido"),
    details: yup.array().min(1).of(
        yup.object().shape({
            concept: yup.string().required("Campo requerido"),
            //string with curency format with prefix
            amount: yup.string().required("Campo requerido").matches(currencyFormat, { message: "Formato incorrecto" })
        })
    ),
    //receipt_number required if adm_purchase_document_type_id is 1
    receipt_number: yup.string()
        .when("adm_purchase_document_type_id", (document_type_id: any) => {
            console.log({ document_type_id })
            if (document_type_id.includes(1)) {
                return yup.string().required("Campo requerido")
            }
            return yup.string()

        }),
    //invoice_serie, invoice_number, adm_provider_id are required if adm_purchase_document_type_id is 2 or 3
    invoice_serie: yup.string()
        .when("adm_purchase_document_type_id", (document_type_id: any) => {

            if (document_type_id.includes(2) || document_type_id.includes(3)) {
                return yup.string().required("Campo requerido")
            }
            return yup.string()

        }),
    invoice_number: yup.string()
        .when("adm_purchase_document_type_id", (document_type_id: any) => {

            if (document_type_id.includes(2) || document_type_id.includes(3)) {
                return yup.string().required("Campo requerido")
            }
            return yup.string()

        }),
    adm_provider_id: yup.number()
        .when("adm_purchase_document_type_id", (document_type_id: any) => {
            if (document_type_id.includes(2) || document_type_id.includes(3)) {
                console.log({ document_type_id })

                return yup.number().required("Campo requerido")
            }
            return yup.number()

        }),


})

export const initialValues = {
    adm_branch_id: 0,
    act_account_id: 0,
    adm_purchase_type_id: 0,
    adm_purchase_document_type_id: 0,

    accounting_date: "",
    payment_date: "",
    description: "",
    date: "",

    receipt_number: "",
    invoice_serie: "",
    invoice_number: "",
    adm_provider_id: 0,


    details: [{ concept: "", amount: 0 }]

}