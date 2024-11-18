import { BasicTable } from "metronic/helpers/components/table/BasicTable";
import { useBasicTable } from "metronic/helpers/components/table/useBasicTable";
import { useEffect } from "react";
import { columns } from "./helpers/_columns";
// import { Search } from "metronic/helpers/components/table/components/header/ListSearchComponent";
import { useSelector } from "react-redux";
import { BasicTableState, ReduxState } from "../../providers";
import * as actions from "../../redux/reducers/clients/actions";

const ListWrapper = () => {
  const users: BasicTableState = useSelector((state: ReduxState) => state.products);
  const { dataList, helpers } = useBasicTable("/store/products", users, actions);

  useEffect(() => {
    if (users.isFirstTime) {
      helpers.fetchData();
    }
  }, []);
  return (
    <BasicTable
      {...helpers}
      headerAddButton
      columnsList={columns}
      dataList={dataList}
    >
     <>
     </>
    </BasicTable>
  );
};

export { ListWrapper };
