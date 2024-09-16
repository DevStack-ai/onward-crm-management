import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { PageTitle } from "metronic/layout/core";
import { MunicipalityWrapper } from "./MunicipalityList";

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
                Municipios
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
                Municipios / Agregar
              </PageTitle>
              {/* <UsersNewWrapper /> */}
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to="/municipalities/view" />} />
    </Routes>
  );
};

export default DepartmentPage;
