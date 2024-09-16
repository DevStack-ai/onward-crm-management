import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { PageTitle } from "metronic/layout/core";
import { UsersListWrapper } from "./UsersList";
import { NewDocumentWrappeer } from "./UsersNew";
import { EditDocumentWrappeer } from "./UsersEdit";
// import { UsersNewWrapper } from "./NewUser"

const UsersPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path="/view"
          element={
            <>
              <PageTitle>
                Usuarios
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
                Usuarios / Agregar
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
                Usuarios / Editar
              </PageTitle>
              <EditDocumentWrappeer />
            </>
          }
        />
      </Route>
      
      <Route index element={<Navigate to="/users/view" />} />
    </Routes>
  );
};

export default UsersPage;
