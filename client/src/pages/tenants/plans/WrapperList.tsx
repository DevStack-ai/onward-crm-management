import { BasicTable } from "table/BasicTable";
import { useBasicTable } from "table/useBasicTable";
import { useEffect } from "react";
import { Columns } from "./helpers/_columns";
import { useSelector } from "react-redux";
import { BasicTableState, ReduxState } from "tableUtils/_models";
import * as actions from "reduxReducers/plans/actions";
import { Search } from "table/components/header/ListSearchComponent";

const ListWrapper = () => {
  const state: BasicTableState = useSelector((state: ReduxState) => state.plans);
  const { dataList, helpers } = useBasicTable("/plans", state, actions);

  useEffect(() => {
    if (state.isFirstTime) {
      helpers.fetchData();
    }
  }, []);

  return (
    <BasicTable
      headerAddButton
      {...helpers}
      columnsList={Columns(state, helpers)}
      dataList={dataList}
    >
      <div className="d-flex gap-2">
        <Search
          onChange={(term: string) => {
            if (term) {
              helpers.setFilters({ name: term });
            } else {
              helpers.setFilters({});
            }
          }}
        />
      </div>
    </BasicTable>
  );
};

export { ListWrapper };
