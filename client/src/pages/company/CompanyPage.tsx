import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { PageTitle } from "metronic/layout/core";
import { MunicipalityWrapper } from "./CompanyList";
import { NewDocumentWrappeer } from "./CompanyNew";
import { EditDocumentWrappeer } from "./CompanyEdit";
import { DetailsWrapper } from "./CompanyDetails";
const DepartmentPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path="/view"
          element={
            <>
              <PageTitle>
                Empresas
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
                Empresa / Agregar
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
                Empresa / Editar
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
                Empresa / Detalle
              </PageTitle>
              <DetailsWrapper />
            </>
          }
        />

      </Route>
      <Route index element={<Navigate to="/company/view" />} />
    </Routes>
  );
};

export default DepartmentPage;
