
import * as yup from "yup";


// name                 String
// account_number       String
// type_id              Int?
// prefix               String?
// adm_bank_id          Int



export const NewSchema = yup.object().shape({

    name: yup.string().required('Este campo es requerido'),
    account_number: yup.string().required('Este campo es requerido'),
    type_id: yup.number().required('Este campo es requerido'),
    prefix: yup.string().required('Este campo es requerido'),
    adm_bank_id: yup.number().required('Este campo es requerido'),
})

export const initialValues = {
    name: '',
    account_number: '',
    type_id: 0,
    prefix: '',
    adm_bank_id: 0,

}