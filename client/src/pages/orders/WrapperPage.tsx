import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { PageTitle } from "metronic/layout/core";
import { ListWrapper } from "./OrdersList";
import { EditWrapper } from "./OrdersEdit";
// import { NewDocumentWrappeer } from "./UsersNew";
// import { EditDocumentWrappeer } from "./UsersEdit";
// import { DetailsWrapper } from "./UsersDetails"

// import { ApproveUser } from "./ApproveUser"

// // contacts

// import { NewDocumentWrapper as NewContact } from "./ContactsNew";
// import { EditWrapper as EditContact } from "./ContactsEdit";


// // address

// import { NewDocumentWrapper as NewAddress } from "./AddressNew";
// import { EditWrapper as EditAddress } from "./AddressEdit";

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
                Ordenes
              </PageTitle>
              <ListWrapper />
            </>
          }
        />



        <Route
          path="/edit/:id"
          element={
            <>
              <PageTitle>
                Clientes / Editar
              </PageTitle>
              <EditWrapper />
            </>
          }
        />



        {/* <Route
          path="/details/:id"
          element={
            <>
              <PageTitle>
                Cliente / Detalles
              </PageTitle>
              <DetailsWrapper />
            </>
          }
        /> */}

      </Route>


      <Route index element={<Navigate to="/orders/view" />} />
    </Routes>
  );
};

export default UsersPage;
