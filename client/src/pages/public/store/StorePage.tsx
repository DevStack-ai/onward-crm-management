/* eslint-disable jsx-a11y/anchor-is-valid */
import { Route, Routes } from "react-router-dom";
import { Outlet, useLocation } from 'react-router-dom'

import Store from "./Store";
import Cart from "./Cart";
import Orders from "./Orders";

import "./store.css"
import { useState } from "react";
import Header from "./components/Header";

interface WrapperProps {
    refresh: boolean,
    doRefresh: () => void
}

const Wrapper = (props: WrapperProps) => {


    return (
        <>
            <section style={{ overflowY: "scroll" }} >
                <Header refresh={props.refresh} />
                <div className="container-fluid px-10 mt-10">
                    <Outlet />
                </div>
            </section>
        </>
    )
}


const StorePage = () => {

    const [refresh, setRefresh] = useState(false)

    function doRefresh() {
        console.log("refreshing")
        setRefresh(!refresh)
    }



    return (
        <Routes>
            <Route element={<Wrapper refresh={refresh} doRefresh={doRefresh} />}>
                <Route path="cart" element={<Cart refresh={refresh} doRefresh={doRefresh} />} />
                <Route path="orders" element={<Orders refresh={refresh} doRefresh={doRefresh} />} />
                <Route index element={<Store refresh={refresh} doRefresh={doRefresh} />} />
            </Route>
        </Routes>
    )
}

export { StorePage };