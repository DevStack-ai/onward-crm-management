import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { PageTitle } from "metronic/layout/core";
import { ListWrapper } from "./List";
import { NewDocumentWrappeer } from "./New";
import { EditDocument } from "./Edit"


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
                Productos
              </PageTitle>
              <ListWrapper />
            </>
          }
        />
        <Route
          path="/create"
          element={
            <>
              <PageTitle>
                Producto/ Agregar
              </PageTitle>
              <NewDocumentWrappeer />
            </>
          }
        />

        <Route
          path="/:id/edit"
          element={
            <>
              <PageTitle>
                Producto/ Editar
              </PageTitle>
              <EditDocument />
            </>
          }

        />

      </Route>

      <Route index element={<Navigate to="/products/view" />} />
    </Routes>
  );
};

export default UsersPage;
