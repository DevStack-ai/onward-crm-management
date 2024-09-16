import { BasicTable } from "metronic/helpers/components/table/BasicTable";
import { useBasicTable } from "metronic/helpers/components/table/useBasicTable";
import { useEffect } from "react";
import { Columns } from "./helpers/_columns";
import { Search } from "metronic/helpers/components/table/components/header/ListSearchComponent";
import { useSelector } from "react-redux";
import { BasicTableState, ReduxState } from "../../providers";
import * as actions from "../../redux/reducers/clients/actions";

const MunicipalityWrapper = () => {
  const clients: BasicTableState = useSelector((state: ReduxState) => state.clients);
  const { dataList, helpers } = useBasicTable("/clients", clients, actions);

  useEffect(() => {
    if (clients.isFirstTime) {
      helpers.fetchData();
    }
  }, []);
  return (
    <BasicTable
      {...helpers}
      headerAddButton
      columnsList={Columns(clients, helpers)}
      dataList={dataList}
    >
      <Search
        onChange={(term: string) => {
          if (term) {
            helpers.setFilters({
              "name": term,
              "nit": term,
              "legal_representative_name": term,
              "phone": term,
            });
          }else{
            helpers.setFilters({});
          }
        }}
      />
    </BasicTable>
  );
};

export { MunicipalityWrapper };
