/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from "react";
import { PageTitle } from "metronic/layout/core";

const DashboardPage: FC = () => (
  <>
  
  </>
);

const DashboardWrapper: FC = () => {
  return (
    <>
      <PageTitle breadcrumbs={[]}>Dashboard</PageTitle>
      <DashboardPage />
    </>
  );
};

export { DashboardWrapper };
