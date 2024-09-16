import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { PageTitle } from "metronic/layout/core";
import { ListWrapper } from "./WrapperList";
import { NewDocumentWrapper } from "./WrapperNew";
import { EditDocumentWrapper } from "./WrapperEdit";
import { DocumentWrapper } from "./WrapperDetails"
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
                Tenants
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
                Tenants / Agregar
              </PageTitle>
              <NewDocumentWrapper />
            </>
          }
        />
        <Route
          path="/:id/details"
          element={
            <>
              <PageTitle>
                Tenants / Detalle
              </PageTitle>
              <DocumentWrapper />
            </>
          }
        />
        <Route
          path="/:id/edit"
          element={
            <>
              <PageTitle>
                Tenants / Editar
              </PageTitle>
              <EditDocumentWrapper />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to="/super/tenant/view" />} />
    </Routes>
  );
};

export default DepartmentPage;
