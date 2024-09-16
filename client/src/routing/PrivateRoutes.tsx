import { FC, lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { MasterLayout } from "../_metronic/layout/MasterLayout";
import TopBarProgress from "react-topbar-progress-indicator";
import { DashboardWrapper } from "../pages/dashboard/DashboardWrapper";
import { getCSSVariableValue } from "../_metronic/assets/ts/_utils";
import { WithChildren } from "../_metronic/helpers";
import { useAuth } from "../providers";

const PrivateRoutes = () => {

  const { hasRequiredRole } = useAuth()

  const ProfilePage = lazy(() => import("../pages/profile/index"));

  const Tenant = lazy(() => import("../pages/tenants/tenant/WrapperPage"));
  const Plans = lazy(() => import("../pages/tenants/plans/WrapperPage"));

  const ProfilesPage = lazy(() => import("../pages/profile/ProfilesPage"));
  const ProvidersPage = lazy(() => import("../pages/providers/WrapperPage"));
  const AccountingAccounts = lazy(() => import("../pages/accounting/accounts/WrapperPage"));
  const AccountingPurchases = lazy(() => import("../pages/accounting/purchases/WrapperPage"));
  const AccountingPurchasesPayment = lazy(() => import("../pages/accounting/payments/WrapperPage"));
  const AccountingSales = lazy(() => import("../pages/accounting/sales/WrapperPage"));

  const BankAccounts = lazy(() => import("../pages/banks-accounts/WrapperPage"));

  const BranchsPage = lazy(() => import("../pages/branchs/WrapperPage"));
  const UsersPage = lazy(() => import("../pages/users/UsersPage"));
  const DepartmentsPage = lazy(() => import("../pages/departments/DepartmentsPage"));
  const MunicipalitiesPage = lazy(() => import("../pages/municipality/MunicipalityPage"));
  const CompanyPage = lazy(() => import("../pages/company/CompanyPage"));
  const ClientsPage = lazy(() => import("../pages/clients/WrapperPage"));

  
  return (
    <Routes>
      <Route element={<MasterLayout />}>
        <Route path="auth/*" element={<Navigate to="/dashboard" />} />
        <Route path="dashboard" element={<DashboardWrapper />} />
        <Route
          path="/profile/*"
          element={
            <SuspensedView>
              <ProfilePage />
            </SuspensedView>
          }
        />

        {hasRequiredRole(1) && (
          <>
            <Route
              path="/super/tenant/*"
              element={
                <SuspensedView>
                  <Tenant />
                </SuspensedView>
              }
            />
            <Route
              path="/super/plans/*"
              element={
                <SuspensedView>
                  <Plans />
                </SuspensedView>
              }
            />
          </>
        )}
        <Route
          path="/users/*"
          element={
            <SuspensedView>
              <UsersPage />
            </SuspensedView>
          }
        />
        <Route
          path="/company/*"
          element={
            <SuspensedView>
              <CompanyPage />
            </SuspensedView>
          }
        />
        <Route
          path="/clients/*"
          element={
            <SuspensedView>
              <ClientsPage />
            </SuspensedView>
          }
        />


        <Route
          path="/departments/*"
          element={
            <SuspensedView>
              <DepartmentsPage />
            </SuspensedView>
          }
        />
        <Route
          path="/municipalities/*"
          element={
            <SuspensedView>
              <MunicipalitiesPage />
            </SuspensedView>
          }
        />
        <Route
          path="/branchs/*"
          element={
            <SuspensedView>
              <BranchsPage />
            </SuspensedView>
          }
        />

        <Route
          path="/profiles/*"
          element={
            <SuspensedView>
              <ProfilesPage />
            </SuspensedView>
          }
        />
        <Route
          path="/purchases/providers/*"
          element={
            <SuspensedView>
              <ProvidersPage />
            </SuspensedView>
          }
        />
        <Route
          path="/accounting/accounts/*"
          element={
            <SuspensedView>
              <AccountingAccounts />
            </SuspensedView>
          }
        />
        <Route
          path="/purchases/purchases/*"
          element={
            <SuspensedView>
              <AccountingPurchases />
            </SuspensedView>
          }
        />
        <Route
          path="/purchases/payments/*"
          element={
            <SuspensedView>
              <AccountingPurchasesPayment />
            </SuspensedView>
          }
        />
        <Route
          path="/sales/sales/*"
          element={
            <SuspensedView>
              <AccountingSales />
            </SuspensedView>
          }
        />
        <Route
          path="/banks/accounts/*"
          element={
            <SuspensedView>
              <BankAccounts />
            </SuspensedView>
          }
        />

        <Route path="*" element={<Navigate to="/error/404" />} />
      </Route>
    </Routes>
  );
};



const SuspensedView: FC<WithChildren> = ({ children }) => {
  const baseColor = getCSSVariableValue("--bs-primary");
  TopBarProgress.config({
    barColors: {
      "0": baseColor,
    },
    barThickness: 2,
    shadowBlur: 5,
  });

  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>;
};

export { PrivateRoutes };
