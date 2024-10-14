import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { PageTitle } from "metronic/layout/core";
import { UsersListWrapper } from "./UsersList";
import { NewDocumentWrappeer } from "./UsersNew";
import { EditDocumentWrappeer } from "./UsersEdit";
import { DetailsWrapper } from "./UsersDetails"

import { ApproveUser } from "./ApproveUser"

// contacts

import { NewDocumentWrapper as NewContact } from "./ContactsNew";
import { EditWrapper as EditContact } from "./ContactsEdit";


// address

import { NewDocumentWrapper as NewAddress } from "./AddressNew";
import { EditWrapper as EditAddress } from "./AddressEdit";

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
                Clientes
              </PageTitle>
              <UsersListWrapper />
            </>
          }
        />
        <Route
          path="/create"
          element={
            <>
              <PageTitle>
                Clientes / Agregar
              </PageTitle>
              <NewDocumentWrappeer />
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
              <EditDocumentWrappeer />
            </>
          }
        />

        <Route
          path="/details/:id/approve"
          element={
            <>
              <PageTitle>
                Cliente / Aprobar
              </PageTitle>
              <ApproveUser />
            </>
          }
        />

        <Route
          path="/details/:id"
          element={
            <>
              <PageTitle>
                Cliente / Detalles
              </PageTitle>
              <DetailsWrapper />
            </>
          }
        />

        <Route
          path="/details/:id/contacts/create"
          element={
            <>
              <PageTitle>
                Cliente / Contacto / Agregar
              </PageTitle>
              <NewContact />
            </>
          }
        />

        <Route
          path="/details/:id/contacts/edit/:contactId"
          element={
            <>
              <PageTitle>
                Cliente / Contacto / Editar
              </PageTitle>
              <EditContact />
            </>
          }
        />

        <Route
          path="/details/:id/address/create"
          element={
            <>
              <PageTitle>
                Cliente / Dirección / Agregar
              </PageTitle>
              <NewAddress />
            </>
          }
        />

        <Route
          path="/details/:id/address/edit/:addressId"
          element={
            <>
              <PageTitle>
                Cliente / Dirección / Editar
              </PageTitle>
              <EditAddress />
            </>
          }
        />
      </Route>

      <Route index element={<Navigate to="/users/view" />} />
    </Routes>
  );
};

export default UsersPage;
