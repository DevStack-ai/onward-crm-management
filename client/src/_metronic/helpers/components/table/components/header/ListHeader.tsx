import { ListToolbar } from "./ListToolbar";
import { AddButton } from "../../AddButton";


const ListHeader = ({ children, headerAddButton, toolbar }: any) => {
  return (
    <div className="card-header border-0 pt-6">
      {/* begin::Card toolbar */}
      <div className="w-50">
        {children}
      </div>
      <div className="card-toolbar">
        {/* <ListToolbar /> */}
        {toolbar}
        {headerAddButton && <AddButton route={typeof headerAddButton === "string" ? headerAddButton : null} />}
      </div>
    </div>
  );
};

export { ListHeader };
