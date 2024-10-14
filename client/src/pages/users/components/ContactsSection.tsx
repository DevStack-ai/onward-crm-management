import React from "react";
import { initialState } from "../../../redux/reducers/helpers";
import { useBasicTable } from "metronic/helpers/components/table/useNoStateTable";
import { BasicTable } from "metronic/helpers/components/table/BasicTable";
import { ContactColumns } from "./_columns";
// import { Search } from "metronic/helpers/components/table/components/header/ListSearchComponent";
// import AssignAccountantModal from "./AssignCompanyModal";
import { BasicTableProps } from "./_types";
import { toast } from "react-toastify";
import { deleteContact, setAsDefaultContact } from "../helpers/_requests";
const ContactsSection = (props: BasicTableProps) => {

    const { dataList, helpers } = useBasicTable(`/contacts/table`, { ...initialState, filters: { cliente: Number(props.row) } });


    async function setDefaultContact(id: number) {

        try {
            await toast.promise(setAsDefaultContact(id), {
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
            await deleteContact(id)
            helpers.fetchData();

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div>
            <BasicTable
                headerAddButton={`/users/details/${props.row}/contacts/create`}
                {...helpers}
                columnsList={ContactColumns(helpers, { cliente: Number(props.row) }, {
                    setDefaultContact: setDefaultContact,
                    deleteContact: softDelete
                })}
                dataList={dataList}
            >

            </BasicTable>
        </div>
    )
}

export default ContactsSection;