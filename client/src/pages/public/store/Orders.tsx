import React from "react";
import { BasicTable } from "metronic/helpers/components/table/BasicTable";
import { useBasicTable } from "metronic/helpers/components/table/useBasicTable";
import { useEffect } from "react";
import { PublicColumns } from "../../orders/helpers/_columns";

import { useSelector } from "react-redux";
import { BasicTableState, ReduxState, useAuth } from "../../../providers";
import * as actions from "../../../redux/reducers/orders/actions";
import { approveOrder, rejectOrder } from "./helpers/_requests";
import { toast } from "react-toastify";

interface OrdersProps {
    refresh: boolean,
    doRefresh: () => void
}
function Orders(props?: OrdersProps) {

    const { currentUser } = useAuth()
    const orders: BasicTableState = useSelector((state: ReduxState) => state.orders);
    const { dataList, helpers } = useBasicTable("/orders", { ...orders, filters: { customer: currentUser?.cli_codigo } }, actions);

    useEffect(() => {
        if (orders.isFirstTime) {
            helpers.fetchData();
        }
    }, []);


    async function approveToOrder(id: number) {
        await toast.promise(approveOrder(id), {
            pending: "Aprobando orden...",
            success: "Orden aprobada",
            error: "Error al aprobar orden"
        });

        window.location.reload();
    }

    async function rejectToOrder(id: number) {
        await toast.promise(rejectOrder(id), {
            pending: "Rechazando orden...",
            success: "Orden rechazada",
            error: "Error al rechazar orden"
        });

        window.location.reload();
    }

    return (
        <BasicTable
            {...helpers}
            // headerAddButton
            columnsList={PublicColumns(orders, {
                approveToOrder,
                rejectToOrder
            })}
            dataList={dataList}
        >
            <>
            </>
        </BasicTable>
    );
}

export default Orders;