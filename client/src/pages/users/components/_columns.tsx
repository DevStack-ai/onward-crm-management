// @ts-nocheck
import { Column } from "react-table";
import { IndexColumn } from "../../helpers/IndexColumn";
import { unassignAccountant } from "../../company/components/_requests";
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
    Header: "NIT",
    accessor: "nit",
  },
  {
    Header: "Dirección",
    accessor: "address",
  },
  {
    Header: "Departamento",
    accessor: "adm_department.name",
    Cell: ({ row }) => row.original.adm_department?.name

  },
  {
    Header: "Municipio",
    accessor: "adm_municipality.name",
    Cell: ({ row }) => row.original.adm_municipality?.name
  },
  {
    Header: "Nombre representante legal",
    accessor: "legal_representative_name",
  },

  {
    Header: "Acciones",
    id: "actions",
    Cell: ({ row }) => {
      return (
        <div className="px-2">
          <div
            onClick={async () => {
              await toast.promise(unassignAccountant(row.original.id, props.user), {
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
