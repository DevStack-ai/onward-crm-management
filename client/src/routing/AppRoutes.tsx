/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import { FC } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { PrivateRoutes } from "./PrivateRoutes";
import { ErrorsPage } from "../components/errors/ErrorsPage";
import { useAuth } from "../providers";
import { App } from "../App";
import { Logout, AuthPage } from "../pages/public/Auth";
import { PublicFormPage } from "../pages/public/forms/FormPage";
import { StorePage } from "../pages/public/store/StorePage";

const PUBLIC_URL = import.meta.env.VITE_PUBLIC_URL;

const AppRoutes: FC = () => {
  const { currentUser } = useAuth();
  console.log({ currentUser })
  return (
    <BrowserRouter basename={PUBLIC_URL}>
      <Routes>
        <Route element={<App />}>
          <Route path="error/*" element={<ErrorsPage />} />
          <Route path="logout" element={<Logout />} />
          {currentUser
            ? (
              <>
                {currentUser.role === "customer" && (
                  <>
                    <Route path="store/*" element={<StorePage />} />
                    <Route path="*" element={<Navigate to="/store" />} />
                  </>
                )}
                {currentUser.role === "admin" && (
                  <>
                    <Route path="/*" element={<PrivateRoutes />} />
                    <Route index element={<Navigate to="/dashboard" />} />
                  </>
                )}
              </>
            )
            : (
              <>
                <Route path="form/*" element={<PublicFormPage />} />
                <Route path="auth/*" element={<AuthPage />} />
                <Route path="*" element={<Navigate to="/auth" />} />
              </>
            )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export { AppRoutes };
