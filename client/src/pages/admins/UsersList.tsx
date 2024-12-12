import { BasicTable } from "metronic/helpers/components/table/BasicTable";
import { useBasicTable } from "metronic/helpers/components/table/useBasicTable";
import { useEffect } from "react";
import { usersColumns } from "./helpers/_columns";
// import { Search } from "metronic/helpers/components/table/components/header/ListSearchComponent";
import { useSelector } from "react-redux";
import { BasicTableState, ReduxState } from "../../providers";
import * as actions from "../../redux/reducers/clients/actions";

const UsersListWrapper = () => {
  const admins: BasicTableState = useSelector((state: ReduxState) => state.admins);
  const { dataList, helpers } = useBasicTable("/admins", admins, actions);

  useEffect(() => {
    if (admins.isFirstTime) {
      helpers.fetchData();
    }
  }, []);
  return (
    <BasicTable
      {...helpers}
      // headerAddButton
      columnsList={usersColumns}
      dataList={dataList}
    >
     <>
     </>
    </BasicTable>
  );
};

export { UsersListWrapper };
