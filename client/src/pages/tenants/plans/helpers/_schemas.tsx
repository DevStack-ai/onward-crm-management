
import { currencyFormat } from "definitions/regex";
import * as yup from "yup";


export const NewSchema = yup.object().shape({
    name: yup.string().required("Este campo es requerido"),
    
    max_companies: yup.number().required("Este campo es requerido"),
    plan_type_id: yup.number().required("Este campo es requerido"),
    plan_period_id: yup.number().required("Este campo es requerido"),
    
    price: yup.string().matches(currencyFormat, "Formato incorrecto"),
})

export const initialValues = {
  name: "",

  max_companies: 0,
  plan_type_id: 0,
  plan_period_id: 0,

  price: 0,

}