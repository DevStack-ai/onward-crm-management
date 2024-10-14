import { KTIcon, toAbsoluteUrl } from "metronic/helpers"
import { useAuth } from "../../../../providers"
import { useEffect, useState } from "react"
import { getCartCount } from "../helpers/_requests"
import { useNavigate } from "react-router-dom"

interface HeaderProps {
    refresh?: boolean

}
export default function Header(props: HeaderProps) {

    const { currentUser, logout } = useAuth()
    const [count, setCount] = useState(0)
    const [cubicFeet, setCubicFeet] = useState(0)

    const naviate = useNavigate()

    async function updateCountCart() {
        const query = await getCartCount(currentUser?.cli_codigo || 0)
        const count = query.data.count as number
        const cubicFeet = query.data.cubicFeet as number
        setCount(count)
        setCubicFeet(cubicFeet)

    }

    useEffect(() => {
        updateCountCart()
    }, [props.refresh])

    return (
        <div className='page d-flex flex-row flex-column-fluid'>
            <div className="app-wrapper flex-column " id="kt_app_wrapper">
                <div
                    id="kt_app_sidebar"
                    className="app-sidebar flex-column"
                    data-kt-drawer="true"
                    data-kt-drawer-name="app-sidebar"
                    data-kt-drawer-activate="{default: true, lg: false}"
                    data-kt-drawer-overlay="true"
                    data-kt-drawer-width="250px"
                    data-kt-drawer-direction="start"
                    data-kt-drawer-toggle="#kt_app_sidebar_mobile_toggle"
                >
                    <div
                        className="app-sidebar-logo flex-shrink-0 d-none d-md-flex align-items-center justify-content-center px-8"
                        id="kt_app_sidebar_logo"
                    >
                        <div>
                            <img
                                src={toAbsoluteUrl("/media/logos/default.png")}
                                alt="logo"
                                className="h-50px h-lg-100px d-none d-sm-inline app-sidebar-logo-default theme-light-show"
                            />
                            <img
                                src={toAbsoluteUrl("/media/logos/default-dark.png")}
                                alt="logo"
                                className="h-25px h-lg-100px d-none d-sm-inline app-sidebar-logo-default theme-dark-show"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className='wrapper d-flex flex-column flex-row-fluid' id='kt_wrapper'>
                <div
                    id="kt_header"
                    className="app-header"
                >
                    <div
                        className="d-flex align-items-center justify-content-between w-100"
                        id="kt_header_container"
                    >
                        <h1 className='text-dark fw-bolder my-0 fs-2'>
                            <div className='px-10'>
                                Hola, {currentUser?.cli_nombre}
                            </div>
                        </h1>
                        <div className='px-5 d-flex gap-5'>
                            <div className='d-flex pointer' onClick={() => naviate("/store/cart")}>
                                {cubicFeet > 0 && <span className='badge badge-success' style={{ minWidth: "20px", height: "20px" }}>{cubicFeet.toFixed(2)} ft³</span>}
                                <KTIcon iconName='handcart' className='h1' style={{ fontSize: "30px", }} />
                                {count > 0 && <span className='badge badge-danger' style={{ minWidth: "20px", height: "20px" }}>{count}</span>}
                                <h2 className='mx-4'>
                                    Carrito
                                </h2>
                            </div>
                            <div className='d-flex pointer' onClick={() => naviate("/orders")}>
                                <KTIcon iconName='paper-clip' className='h1' style={{ fontSize: "30px", }} />
                                <h2>
                                    Mis Ordenes
                                </h2>
                            </div>

                            <div className='d-flex align-items-center pointer' onClick={logout}>
                                <KTIcon iconName='arrow-left' className='h1' style={{ fontSize: "30px" }} />
                                <h2 className='mx-4'>
                                    Cerrar sesion
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
}