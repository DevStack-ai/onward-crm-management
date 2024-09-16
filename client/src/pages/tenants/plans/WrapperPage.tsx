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
                Planes
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
                Planes / Agregar
              </PageTitle>
              <NewDocumentWrapper />
            </>
          }
        />
        <Route
          path="/:id/edit"
          element={
            <>
              <PageTitle>
                Planes / Editar
              </PageTitle>
              <EditDocumentWrapper />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to="/super/plans/view" />} />
    </Routes>
  );
};

export default DepartmentPage;
