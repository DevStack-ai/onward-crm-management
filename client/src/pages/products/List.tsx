import { BasicTable } from "metronic/helpers/components/table/BasicTable";
import { useBasicTable } from "metronic/helpers/components/table/useBasicTable";
import { useEffect } from "react";
import { columns } from "./helpers/_columns";
import { Search } from "metronic/helpers/components/table/components/header/ListSearchComponent";
import { useSelector } from "react-redux";
import { BasicTableState, ReduxState } from "../../providers";
import * as actions from "../../redux/reducers/products/actions";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { downloadProducts } from "./helpers/_requests";

const ListWrapper = () => {
  const users: BasicTableState = useSelector((state: ReduxState) => state.products);
  const { dataList, helpers } = useBasicTable("/store/products", users, actions);
  const navigate = useNavigate();

  useEffect(() => {
    if (users.isFirstTime) {
      helpers.fetchData();
    }
  }, []);
  return (
    <BasicTable
      {...helpers}
      headerAddButton
      columnsList={columns(helpers)}
      dataList={dataList}
      onRowClick={(row: any) => {
        navigate(`/products/${row.art_codigo}/edit`);
      }}
    >
      <div className="d-flex align-items-center position-relative my-1">
        <Button variant="secondary" className="mx-2" onClick={() => {
          toast.promise(downloadProducts({ ...helpers.filters }), {
            pending: "Descargando...",
            success: "Descargado",
            error: "Error al descargar"
          });
        }}>
          Exportar
        </Button>
        <Search
          onChange={(input: string) => helpers.setFilters({ name: input })}
        />
      </div >
    </BasicTable>
  );
};

export { ListWrapper };
