// @ts-nocheck
import { Column } from "react-table";
import { IndexColumn } from "../../helpers/IndexColumn";

const Columns = (state): ReadonlyArray<Column<Object>> => [
  {
    Header: "No",
    accessor: "auth_profile_id",
    Cell: ({ row }) => IndexColumn(row.index, state),

  },
  {
    Header: "Nombre",
    accessor: "auth_profile_name",
  },
  {
    Header: "Acciones",
    id: "actions",
    Cell: ({ row }) => {
      return (
        <div className="px-2">
          <a
            href="#"
            className="btn btn-secondary btn-sm me-2 mb-2 hover-elevate-down"
          >
            Editar
          </a>
        </div>
      );
    },
  },
];

export { Columns };
