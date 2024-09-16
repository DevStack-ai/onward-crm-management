import { BasicTable } from "metronic/helpers/components/table/BasicTable";
import { useBasicTable } from "metronic/helpers/components/table/useBasicTable";
import { Search } from "metronic/helpers/components/table/components/header/ListSearchComponent";
import { useEffect } from "react";
import { Columns } from "./helpers/_columns";
import { useSelector } from "react-redux";
import { BasicTableState, ReduxState } from "tableUtils/_models";
import * as actions from "reduxReducers/accounting-accounts/actions";
import ImportAccountsModal from "../../company/components/ImportAccounts";
import { useAuth } from "../../../providers";
import { KTIcon } from "metronic/helpers";

const ListWrapper = () => {

  const { currentUser } = useAuth()

  const accountingAccounts: BasicTableState = useSelector((state: ReduxState) => state.accountingAccounts);
  const { dataList, helpers } = useBasicTable("/accounting-accounts", accountingAccounts, actions);

  useEffect(() => {
    if (accountingAccounts.isFirstTime) {
      helpers.fetchData();
    }
  }, []);

  //get current company id
  const company = currentUser?.currentCompany;

  return (
    <div>
      {!!company?.id && <ImportAccountsModal
        companyId={String(company.id)}
        onAssign={() => helpers.fetchData()}
      />}
      <BasicTable
        {...helpers}
        headerAddButton
        columnsList={Columns(accountingAccounts, helpers)}
        dataList={dataList}
        toolbar={
          !!dataList.length ? <></> :
            <button className="btn btn-secondary  me-2 " data-bs-toggle="modal" data-bs-target="#importAccountsModal">
              <KTIcon iconName="tablet-down" className="pr-2" />
              Importar cuentas
            </button>
        }
      >

        <Search
          onChange={(term: string) => helpers.setFilters({ name: term })}
        />

      </BasicTable>
    </div>
  );
};

export { ListWrapper };
