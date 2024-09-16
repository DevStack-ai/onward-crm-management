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
                Compras
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
                Compras / Agregar
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
                Compras / Editar
              </PageTitle>
              <EditDocumentWrapper />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to="/purchases/purchases/view" />} />
    </Routes>
  );
};

export default DepartmentPage;
