import { BasicTable } from "metronic/helpers/components/table/BasicTable";
import { useBasicTable } from "metronic/helpers/components/table/useBasicTable";
import { useEffect } from "react";
import { Columns } from "./helpers/_columns";
import { Search } from "metronic/helpers/components/table/components/header/ListSearchComponent";
import { useSelector } from "react-redux";
import { BasicTableState, ReduxState } from "../../providers";
import * as actions from "../../redux/reducers/branchs/actions";

interface Props {
  companyId?: string;
}

const ListWrapper = (props: Props) => {
  const branchs: BasicTableState = useSelector((state: ReduxState) => state.branchs);
  const { dataList, helpers } = useBasicTable("/branchs", branchs, actions, {
    adm_company_id: Number(props.companyId)
  });

  useEffect(() => {
    if (branchs.isFirstTime) {
      helpers.fetchData();
    }
  }, []);
  return (
    <BasicTable
      {...helpers}
      headerAddButton
      columnsList={Columns(branchs)}
      dataList={dataList}
    >
      <Search
        onChange={(term: string) => helpers.setFilters({ name: term })}
      />
    </BasicTable>
  );
};

export { ListWrapper };
