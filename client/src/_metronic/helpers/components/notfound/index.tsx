import React from "react";
import BackButton from "../backbutton";
import { toAbsoluteUrl } from "../../AssetHelpers";

const NotFound = () => {
    return (
        <div className="h-100 d-flex justify-content-center w-100 py-10">
            <div className="text-center">
                <h1 className='fw-bolder fs-2hx text-gray-900 mb-4'>Oops!</h1>

                <div className='fw-semibold fs-6 text-gray-500 mb-7'>No hemos encontrado lo que buscas.</div>

                <div className='mb-3'>
                    <img
                        src={toAbsoluteUrl('/media/auth/404-error.png')}
                        className='mw-100 mh-300px theme-light-show'
                        alt=''
                    />
                    <img
                        src={toAbsoluteUrl('/media/auth/404-error-dark.png')}
                        className='mw-100 mh-300px theme-dark-show'
                        alt=''
                    />
                </div>
                {/* end::Illustration */}

                {/* begin::Link */}
                <div className='mb-0'>
                    <BackButton/>
                </div>
            </div>
        </div>
    )
}

export default NotFound;