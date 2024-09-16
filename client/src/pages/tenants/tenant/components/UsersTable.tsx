import React, { useEffect } from "react";
import { initialState } from "reduxReducers/helpers";
import { useBasicTable } from "table/useNoStateTable";
import { BasicTable } from "table/BasicTable";
import { usersColumns } from "../../../users/helpers/_columns";
import { Search } from "table/components/header/ListSearchComponent";
import { getCompanies } from "../helpers/_requests";
import Select from "metronic/partials/components/SimpleSelect"

type UsersTableProps = {
  tenantId: string;
  companies: any[];
};


function UsersTable(props: UsersTableProps) {

  const [selectedCompany, setSelectedCompany] = React.useState({} as { id: string, name: string });

  const { dataList, helpers } = useBasicTable(`/tenant/${props.tenantId}/companies/users`, initialState);

  useEffect(() => {
    if(props.companies.length > 0) {
      setSelectedCompany(props.companies[0]);
      helpers.setFilters({
        ...helpers.filters,
        "company": props.companies[0].id
      });
      helpers.fetchData();
    }
    
  }, [props.companies]);
  return (
    <div>
      <BasicTable
        {...helpers}
        columnsList={usersColumns}
        dataList={dataList}
      >
        <div className="d-flex gap-2">
          <div>

            <label className="form-label">Nombre</label>
            <Search
              onChange={(term: string) => helpers.setFilters({
                ...helpers.filters,
                "name": term
              })}
            />
          </div>
          <Select
            name="company"
            label="Empresa"
            placeholder="Empresa"
            className="w-200px"
            type="text"
            autoSelect
            options={props.companies}
            value={selectedCompany}
            onInputChange={(option: any) => {
              console.log("Option", option);
              helpers.setFilters({
                ...helpers.filters,
                "company": option.value
              });
              setSelectedCompany(props.companies.find((company) => company.id === option.value));
              helpers.fetchData();
            }}
          />
        </div>
      </BasicTable>
    </div>
  );
}

export default UsersTable;