// @ts-nocheck
import { Column } from "react-table";
import { IndexColumn } from "../../helpers/IndexColumn";
import moment from "moment";
import { unassignAccountant } from "./_requests";
import { toast } from "react-toastify";

const Columns = (state, props, actions): ReadonlyArray<Column<Object>> => [
  {
    Header: "No",
    accessor: "index",
    Cell: ({ row }) => IndexColumn(row.index, state),
  },
  {
    Header: "Nombre",
    accessor: "name",
  },

  {
    Header: "Correo Electronico",
    accessor: "email",
  },

  {
    Header: "Acciones",
    id: "actions",
    Cell: ({ row }) => {
      return (
        <div className="px-2">
          <div
            onClick={async () => {
              await toast.promise(unassignAccountant(props.company, row.original.id), {
                pending: "Desasignando",
                success: "Desasignado",
                error: "Error al desasignar",
              });
              actions.fetchData();
            }}
            className="btn btn-light-danger btn-sm me-2 mb-2 hover-elevate-down"
          >
            Desasignar
          </div>
        </div>
      );
    },
  },
];

export { Columns };
