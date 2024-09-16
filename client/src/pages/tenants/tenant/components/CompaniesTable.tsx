import React, { useEffect, useMemo } from "react";
import { initialState } from "reduxReducers/helpers";
import { useBasicTable } from "table/useNoStateTable";
import { BasicTable } from "table/BasicTable";
import { Columns } from "../../../company/helpers/_columns";
import { Search } from "table/components/header/ListSearchComponent";
import { getCompanies } from "../helpers/_requests";
import Select from "metronic/partials/components/SimpleSelect"

type CompaniesTableProps = {
  tenantId: string;
  companies: any[];
};


function CompaniesTable(props: CompaniesTableProps) {

  const [filter, setFilter] = React.useState<string>("");

  const dataList = useMemo(() => {
    return props.companies
      .filter((company) => company.id > 0)
      .filter((company) => company.name.toLowerCase().includes(filter.toLowerCase()));
  }, [props.companies, filter]);

  return (
    <div>
      <BasicTable
        columnsList={Columns({})}
        dataList={dataList}
        isLoading={false}
        page={1}
        setPage={() => { }}
        itemsPerPage={props.companies.length}
        setItemsPerPage={() => { }}
        total={props.companies.length}
        pages={1}
      >
        <div >

          <label className="form-label">Nombre</label>
          <Search
            onChange={(term: string) => setFilter(term)}
          />
        </div>

      </BasicTable>
    </div>
  );
}

export default CompaniesTable;