import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { PageTitle } from "metronic/layout/core";
import { ProfilesList } from "./ProfilesList";
import { NewDocumentWrappeer } from "./ProfilesNew";
// import { UsersNewWrapper } from "./NewUser"

const ProfilesPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path="/view"
          element={
            <>
              <PageTitle>
                Perfiles
              </PageTitle>
              <ProfilesList />
            </>
          }
        />
        
        <Route
          path="/create"
          element={
            <>
              <PageTitle>
                Perfil / Agregar
              </PageTitle>
              <NewDocumentWrappeer />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to="/profiles/view" />} />
    </Routes>
  );
};

export default ProfilesPage;
