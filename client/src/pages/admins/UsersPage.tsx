import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { PageTitle } from "metronic/layout/core";
import { UsersListWrapper } from "./UsersList";
import { NewDocumentWrappeer } from "./UsersNew";
import { EditDocumentWrappeer } from "./UsersEdit";
// import { DetailsWrapper } from "./UsersDetails"

import { ChangePassword } from "./ApproveResetPssword"


const UsersPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path="/view"
          element={
            <>
              <PageTitle>
                Administradores
              </PageTitle>
              <UsersListWrapper />
            </>
          }
        />
        <Route
          path="/create"
          element={
            <>
              <PageTitle>
                Administradores / Agregar
              </PageTitle>
              <NewDocumentWrappeer />
            </>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <>
              <PageTitle>
                Administradores / Editar
              </PageTitle>
              <EditDocumentWrappeer />
            </>
          }
        />
        <Route
          path="/details/:id/reset-password"
          element={
            <>
              <PageTitle>
                Administrador / Cambiar contraseña
              </PageTitle>
              <ChangePassword />
            </>
          }
        />

        {/* <Route
          path="/details/:id"
          element={
            <>
              <PageTitle>
                Cliente / Detalles
              </PageTitle>
              <DetailsWrapper />
            </>
          }
        /> */}


      </Route>

      <Route index element={<Navigate to="/admins/view" />} />
    </Routes>
  );
};

export default UsersPage;
