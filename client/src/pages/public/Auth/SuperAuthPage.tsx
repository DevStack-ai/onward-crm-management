/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { Registration } from "./components/Registration";
import { ForgotPassword } from "./components/ForgotPassword";
import { SuperLogin } from "./components/SuperLogin";
import { toAbsoluteUrl } from "metronic/helpers";

const AuthLayout = () => {
  useEffect(() => {
    document.body.classList.add("bg-body");
    return () => {
      document.body.classList.remove("bg-body");
    };
  }, []);

  return (
    <div className="d-flex flex-column flex-lg-row flex-column-fluid h-100">
      {/* begin::Content */}
      <div className="d-flex flex-column flex-lg-row-fluid w-lg-50 p-10 order-2 order-lg-1">
        <div className="d-flex flex-center flex-column flex-lg-row-fluid">
          <div className="w-lg-500px p-10">
            <Outlet />
          </div>
        </div>
    
      </div>
      <div
        className="d-flex flex-lg-row-fluid w-lg-50 bgi-size-cover bgi-position-center order-1 order-lg-2"
        style={{
          backgroundImage: `url(${toAbsoluteUrl("/media//misc/super-auth-bg.png")})`,
        }}
      >
        <div className="d-flex flex-column flex-center py-7 py-lg-15 px-5 px-md-15 w-100">
          <a href="../../demo42/dist/index.html" className="mb-0 mb-lg-12">
            <img
              alt="Logo"
              src={toAbsoluteUrl("/media/logos/default-dark.png")}
              className="h-60px h-lg-75px"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

const SuperAuthPage = () => (
  <Routes>
    <Route element={<AuthLayout />}>
      <Route path="login" element={<SuperLogin />} />
      <Route index element={<SuperLogin />} />
    </Route>
  </Routes>
);

export { SuperAuthPage };
