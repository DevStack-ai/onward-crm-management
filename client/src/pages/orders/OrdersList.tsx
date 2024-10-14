import { BasicTable } from "metronic/helpers/components/table/BasicTable";
import { useBasicTable } from "metronic/helpers/components/table/useBasicTable";
import { useEffect } from "react";
import { columns } from "./helpers/_columns";
import { Search } from "metronic/helpers/components/table/components/header/ListSearchComponent";
import { useSelector } from "react-redux";
import { BasicTableState, ReduxState } from "../../providers";
import * as actions from "../../redux/reducers/clients/actions";

const ListWrapper = () => {
  const orders: BasicTableState = useSelector((state: ReduxState) => state.orders);
  const { dataList, helpers } = useBasicTable("/orders", orders, actions);

  useEffect(() => {
    if (orders.isFirstTime) {
      helpers.fetchData();
    }
  }, []);
  return (
    <BasicTable
      {...helpers}
      // headerAddButton
      columnsList={columns(orders, {})}
      dataList={dataList}
    >

    </BasicTable>
  );
};

export { ListWrapper };
