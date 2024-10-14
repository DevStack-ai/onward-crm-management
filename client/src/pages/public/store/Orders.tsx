import React from "react";

interface OrdersProps {
    refresh: boolean,
    doRefresh: () => void
}
function Orders(props: OrdersProps) {

    return (
        <div>
            <h1>Orders</h1>
        </div>
    )
}

export default Orders;