import { useEffect } from "react";
import { useSelector } from "react-redux";
import { BasicTable } from "table/BasicTable";
import { useBasicTable } from "table/useBasicTable";
import { Search } from "table/components/header/ListSearchComponent";
import { Columns } from "./helpers/_columns";
import { BasicTableState, ReduxState } from "tableUtils/_models";
import * as actions from "reduxReducers/accounting-purchase-payments/actions";

const ListWrapper = () => {
  const state: BasicTableState = useSelector((state: ReduxState) => state.accoutingPurchasePayments);
  const { dataList, helpers } = useBasicTable("/payments", state, actions);

  useEffect(() => {
    if (state.isFirstTime) {
      helpers.fetchData();
    }
  }, []);
  
  return (
    <BasicTable
      {...helpers}
      headerAddButton
      columnsList={Columns(state, helpers)}
      dataList={dataList}
    >
      <Search
        onChange={(term: string) => helpers.setFilters({ name: term })}
      />
    </BasicTable>
  );
};

export { ListWrapper };
