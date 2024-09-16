import { BasicTable } from "table/BasicTable";
import { useBasicTable } from "table/useBasicTable";
import { useEffect } from "react";
import { Columns } from "./helpers/_columns";
import { useSelector } from "react-redux";
import { BasicTableState, ReduxState } from "tableUtils/_models";
import * as actions from "reduxReducers/accounting-purchase/actions";
import Select from "metronic/partials/components/Select"
import { NewDocumentWrapper as ProviderCreate } from "../../providers/WrapperNew"
import { Datepicker } from "metronic/partials/components/Date";

const ListWrapper = () => {
  const accountingSale: BasicTableState = useSelector((state: ReduxState) => state.accountingSale);
  const { dataList, helpers } = useBasicTable("/accounting-sale", accountingSale, actions);

  useEffect(() => {
    if (accountingSale.isFirstTime) {
      helpers.fetchData();
    }
  }, []);


  return (
    <BasicTable
      {...helpers}
      headerAddButton
      columnsList={Columns(accountingSale, helpers)}
      dataList={dataList}
    >
      <div className="d-flex gap-2">
        {/* <Select
          addNoOption
          label="Proveedor"
          name="adm_provider_id"
          placeholder="Proveedor"
          source="providers"
          className="w-200px"
          onInputChange={(option) => helpers.setFilters({
            ...helpers.filters,
            adm_provider_id: option.value
          })}
          createOnScreen
          createComponent={<ProviderCreate />}
        />
        <div className="d-flex">
          <Datepicker
            label="Fecha de inicio"
            onChange={(date: string) => helpers.setFilters({
              ...helpers.filters,
              start_date: date
            })}
          />
          <Datepicker
            label="Fecha de fin"
            onChange={(date: string) => helpers.setFilters({
              ...helpers.filters,
              end_date: date
            })}
          />
        </div>
        <Select
          name="adm_branch_id"
          label="Sucursal"
          placeholder="Sucursal"
          className="w-200px"
          type="text"
          source="branchs"
          autoSelect
          onInputChange={(option) => helpers.setFilters({ ...helpers.filters, adm_branch_id: option.value })}
        /> */}
      </div>
    </BasicTable>
  );
};

export { ListWrapper };
