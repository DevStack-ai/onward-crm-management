import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { PageTitle } from "metronic/layout/core";
import { MunicipalityWrapper } from "./WrapperList";
import { NewDocumentWrappeer } from "./WrapperNew";
import { EditDocumentWrappeer } from "./WrapperEdit";
import { DetailsWrapper } from "./WrapperDetails";
const DepartmentPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path="/view"
          element={
            <>
              <PageTitle>
                Clientes
              </PageTitle>
              <MunicipalityWrapper />
            </>
          }
        />

        <Route
          path="/create"
          element={
            <>
              <PageTitle>
                Cliente / Agregar
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
                Cliente / Editar
              </PageTitle>
              <EditDocumentWrappeer />
            </>
          }
        />
        <Route
          path="/:id/details"
          element={
            <>
              <PageTitle>
                Cliente / Detalle
              </PageTitle>
              <DetailsWrapper />
            </>
          }
        />

      </Route>
      <Route index element={<Navigate to="/clients/view" />} />
    </Routes>
  );
};

export default DepartmentPage;
