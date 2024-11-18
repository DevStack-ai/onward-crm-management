
import * as yup from "yup";

//all fields will be required
export const NewSchhecma = yup.object().shape({
    
    category: yup.string().required("Este campo es requerido"),
    provider: yup.string().required("Este campo es requerido"),
    brand: yup.string().required("Este campo es requerido"),
    country: yup.string().required("Este campo es requerido"),
    name: yup.string().required("Este campo es requerido"),
    description: yup.string().required("Este campo es requerido"),
    packing_description: yup.string().required("Este campo es requerido"),

    box_weight: yup.number().required("Este campo es requerido"),
    boxes_per_pallet: yup.number().required("Este campo es requerido"),
    boxes_per_level: yup.number().required("Este campo es requerido"),
    levels_per_pallet: yup.number().required("Este campo es requerido"),
    pallet_height: yup.number().required("Este campo es requerido"),
    unit: yup.string().required("Este campo es requerido"),
    box_length: yup.number().required("Este campo es requerido"),
    box_width: yup.number().required("Este campo es requerido"),
    box_height: yup.number().required("Este campo es requerido"),
    unit_box: yup.string().required("Este campo es requerido"),

    fda_number: yup.string().required("Este campo es requerido"),
    fce_cid: yup.string().required("Este campo es requerido"),
    hts_item_number: yup.string().required("Este campo es requerido"),
    fda_product_code: yup.string().required("Este campo es requerido"),

    currency: yup.string().required("Este campo es requerido"),
    purchase_price_q: yup.number().required("Este campo es requerido"),
    purchase_price_d: yup.number().required("Este campo es requerido"),
    sale_price_d: yup.number().required("Este campo es requerido"),
})

export const initialValues = {
    category: "",
    provider: "",
    brand: "",
    country: "",
    name: "",
    description: "",
    packing_description: "",
    box_weight: "",
    boxes_per_pallet: "",
    boxes_per_level: "",
    levels_per_pallet: "",
    pallet_height: "",
    box_length: "",
    box_width: "",
    box_height: "",
    fda_number: "",
    fce_cid: "",
    hts_item_number: "",
    fda_product_code: "",
    currency: "",
    purchase_price_q: "",
    purchase_price_d: "",
    sale_price_d: "",

    is_perishable: "1",
    labels: "1",
    unit_box: "cm",
    unit: "ft"

}
