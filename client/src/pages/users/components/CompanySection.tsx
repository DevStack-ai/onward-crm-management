import React from "react";
import { initialState } from "../../../redux/reducers/helpers";
import { useBasicTable } from "metronic/helpers/components/table/useNoStateTable";
import { BasicTable } from "metronic/helpers/components/table/BasicTable";
import { Columns } from "./_columns";
import { Search } from "metronic/helpers/components/table/components/header/ListSearchComponent";
import AssignAccountantModal from "./AssignCompanyModal";
import { CompanySectionProps } from "./_types";
const AssignCompanySection = (props: CompanySectionProps) => {

    const { dataList, helpers } = useBasicTable(`/accountants/company/${props.userId}`, initialState);

    return (
        <div>
            <BasicTable
                {...helpers}
                columnsList={Columns(helpers, { user: props.userId }, helpers)}
                dataList={dataList}
            >
                <div className="d-flex gap-2">
                    <Search
                        onChange={(term: string) => helpers.setFilters({ "name": term })}
                    />

                    <AssignAccountantModal userId={props.userId} refresh={helpers.isLoading} onAssign={helpers.fetchData}/>
                </div>
            </BasicTable>
        </div>
    )
}

export default AssignCompanySection;