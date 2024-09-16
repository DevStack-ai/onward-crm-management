// @ts-nocheck
import { Column } from "react-table";
import { IndexColumn } from "../../helpers/IndexColumn";
import moment from "moment";
import { Link } from "react-router-dom";
const Columns = (state): ReadonlyArray<Column<Object>> => [
  {
    Header: "No",
    accessor: "id",
    Cell: ({ row }) => IndexColumn(row.index, state),
  },
  {
    Header: "Empresa",
    accessor: "adm_company.name",
    Cell: ({ row }) => row.original.adm_company?.name,
  },
  {
    Header: "Nombre",
    accessor: "name",
  },
  {
    Header: "Dirección",
    accessor: "address",
  },
  {
    Header: "Número de teléfono",
    accessor: "phone",
  },
  {
    Header: "Acciones",
    id: "actions",
    Cell: ({ row }) => {
      return (
        <div className="px-2">
          <Link
            to={`/branchs/edit/${row.original.id}`}
            className="btn btn-secondary btn-sm me-2 mb-2 hover-elevate-down"
          >
            Editar
          </Link>
        </div>
      );
    },
  },
];

export { Columns };
