import { BasicTable } from "metronic/helpers/components/table/BasicTable";
import { useBasicTable } from "metronic/helpers/components/table/useBasicTable";
import { useEffect } from "react";
import { Columns } from "./helpers/_columns";
import { Search } from "metronic/helpers/components/table/components/header/ListSearchComponent";
import { useSelector } from "react-redux";
import { BasicTableState, ReduxState } from "../../providers";
import * as actions from "../../redux/reducers/providers/actions";

const ListWrapper = () => {
  const providers: BasicTableState = useSelector((state: ReduxState) => state.providers);
  const { dataList, helpers } = useBasicTable("/providers", providers, actions);

  useEffect(() => {

    if (providers.isFirstTime) {
      helpers.fetchData();
    }
  }, []);
  return (
    <BasicTable
      {...helpers}
      headerAddButton
      columnsList={Columns(providers, helpers)}
      dataList={dataList}
    >
      <Search
        onChange={(term: string) => helpers.setFilters({ name: term })}
      />
    </BasicTable>
  );
};

export { ListWrapper };
