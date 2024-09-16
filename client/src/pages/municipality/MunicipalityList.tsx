import { BasicTable } from "metronic/helpers/components/table/BasicTable";
import { useBasicTable } from "metronic/helpers/components/table/useBasicTable";
import { useEffect } from "react";
import { Columns } from "./helpers/_columns";
import { Search } from "metronic/helpers/components/table/components/header/ListSearchComponent";
import { useSelector } from "react-redux";
import { BasicTableState, ReduxState } from "../../providers";
import * as actions from "../../redux/reducers/municipality/actions";

const MunicipalityWrapper = () => {
  const municipality: BasicTableState = useSelector((state: ReduxState) => state.municipality);
  const { dataList, helpers } = useBasicTable("/municipality", municipality, actions);

  useEffect(() => {
    if (municipality.isFirstTime) {
      helpers.fetchData();
    }
  }, []);
  return (
    <BasicTable
      {...helpers}
      headerAddButton
      columnsList={Columns(municipality)}
      dataList={dataList}
    >
      <Search
        onChange={(term: string) => {
          if (term) {
            helpers.setFilters({
              "name": term
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
