import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { PageTitle } from "metronic/layout/core";
import { ListWrapper } from "./WrapperList";
import { NewDocumentWrapper } from "./WrapperNew";
import { EditDocumentWrapper } from "./WrapperEdit";
// import { UsersNewWrapper } from "./NewUser"

const DepartmentPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path="/view"
          element={
            <>
              <PageTitle>
                Proveedores
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
                Proveedores / Agregar
              </PageTitle>
              <NewDocumentWrapper />
            </>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <>
              <PageTitle>
                Proveedores / Editar
              </PageTitle>
              <EditDocumentWrapper />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to="/purchases/providers/view" />} />
    </Routes>
  );
};

export default DepartmentPage;
