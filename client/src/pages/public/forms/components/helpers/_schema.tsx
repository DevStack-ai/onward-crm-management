import * as yup from 'yup';


export const SelfClientInitialValues = {
    company_name: "",

    company_billing_address_1: "",
    company_billing_address_2: "",
    company_billing_city: "",
    company_billing_state: "",
    company_billing_zip: "",

    company_delivery_address_1: "",
    company_delivery_address_2: "",
    company_city: "",
    company_state: "",
    company_zip: "",

    company_contact: "",
    company_email: "",
    company_phone: "",
    company_job: "",
};
// check from SelfClient.tsx
export const SelfClientSchema = yup.object().shape({
    company_name: yup.string().required('Este campo es requerido'),

    company_billing_address_1: yup.string().required('Este campo es requerido'),
    company_billing_address_2: yup.string().optional(),
    company_billing_city: yup.string().required('Este campo es requerido'),
    company_billing_state: yup.string().required('Este campo es requerido'),
    company_billing_zip: yup.string().required('Este campo es requerido'),

    company_delivery_address_1: yup.string().required('Este campo es requerido'),
    company_delivery_address_2: yup.string().optional(),
    company_city: yup.string().required('Este campo es requerido'),
    company_state: yup.string().required('Este campo es requerido'),
    company_zip: yup.string().required('Este campo es requerido'),

    company_contact: yup.string().required('Este campo es requerido'),
    company_email: yup.string().required('Este campo es requerido'),
    company_phone: yup.string().required('Este campo es requerido'),
    company_job: yup.string().required('Este campo es requerido'),
});

