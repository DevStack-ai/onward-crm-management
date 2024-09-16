import * as yup from "yup";



export const NewSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    plan_id: yup.number().required("Plan is required"),
    email: yup.string().email().required("Email is required"),
  
})

export const initialValues = {
    name: "",
    plan_id: 0,
    
    email: "",

}