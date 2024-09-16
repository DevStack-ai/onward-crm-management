import React from "react";
import { initialState } from "../../../redux/reducers/helpers";
import { useBasicTable } from "metronic/helpers/components/table/useNoStateTable";
import { BasicTable } from "metronic/helpers/components/table/BasicTable";
import { Columns } from "./_columns";
import { Search } from "metronic/helpers/components/table/components/header/ListSearchComponent";
import AssignAccountantModal from "./AssignAccountantModa";
import { AccountantsSectionProps } from "./_types";

const AccountantsSection = (props: AccountantsSectionProps) => {

    const { dataList, helpers } = useBasicTable(`/company/accountants/${props.companyId}`, initialState);

    return (
        <div>
            <BasicTable
                {...helpers}
                columnsList={Columns(helpers, { company: props.companyId }, helpers)}
                dataList={dataList}
            >
                <div className="d-flex gap-2">
                    <Search
                        onChange={(term: string) => helpers.setFilters({ "name": term })}
                    />

                    <AssignAccountantModal companyId={props.companyId} refresh={helpers.isLoading} onAssign={helpers.fetchData}/>
                </div>
            </BasicTable>
        </div>
    )
}

export default AccountantsSection;