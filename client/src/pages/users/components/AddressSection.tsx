import React from "react";
import { initialState } from "../../../redux/reducers/helpers";
import { useBasicTable } from "metronic/helpers/components/table/useNoStateTable";
import { BasicTable } from "metronic/helpers/components/table/BasicTable";
import { Columns } from "./_columns";
// import { Search } from "metronic/helpers/components/table/components/header/ListSearchComponent";
// import AssignAccountantModal from "./AssignCompanyModal";
import { BasicTableProps } from "./_types";
import { toast } from "react-toastify";
import { deleteAddress, setAsDefaultAddress } from "../helpers/_requests";
const AddressSection = (props: BasicTableProps) => {

    const { dataList, helpers } = useBasicTable(`/addresses/table`, { ...initialState, filters: { cliente: Number(props.row) } });

    async function setDefaultAddress(id: number) {

        try {
            await toast.promise(setAsDefaultAddress(id), {
                pending: "Actualizando contacto...",
                success: "Contacto actualizado exitosamente",
                error: "Error al actualizar contacto"
            });

            helpers.fetchData();
        } catch (error) {
            console.log(error);
        }
    }

    async function softDelete(id: number) {

        try {
            await deleteAddress(id)
            helpers.fetchData();

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div>
            <BasicTable
                {...helpers}
                headerAddButton={`/users/details/${props.row}/address/create`}
                columnsList={Columns(helpers, { cliente: Number(props.row) }, {
                    setDefaultAddress: setDefaultAddress,
                    deleteAddress: softDelete
                })}
                dataList={dataList}
            >

            </BasicTable>
        </div>
    )
}

export default AddressSection;