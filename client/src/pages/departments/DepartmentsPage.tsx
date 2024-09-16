import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { PageTitle } from "metronic/layout/core";
import { DepartmentsWrapper } from "./DepartmentsList";

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
                Departamentos
              </PageTitle>
              <DepartmentsWrapper />
            </>
          }
        />
        
        <Route
          path="/create"
          element={
            <>
              <PageTitle>
                Departamentos / Agregar
              </PageTitle>
              {/* <UsersNewWrapper /> */}
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to="/departments/view" />} />
    </Routes>
  );
};

export default DepartmentPage;
