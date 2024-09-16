// @ts-nocheck
import { Column } from "react-table";
import { IndexColumn } from "../../../helpers/IndexColumn";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { deleteRow } from "./_requests";
import { getBadgeColor, numberToCurrency } from "utils/index";
import moment from "moment";
const Columns = (state, helpers): ReadonlyArray<Column<Object>> => [
  {
    Header: "No",
    accessor: "id",
    Cell: ({ row }) => IndexColumn(row.index, state),
  },
  {
    Header: "Proveedor",
    accessor: "provider_name",
    Cell: ({ row }) => row.original.act_purchase?.adm_provider?.name,
  },
  {
    Header: "Compra",
    accessor: "description",
    Cell: ({ row }) => row.original.act_purchase?.description
  },
  {
    Header: "Método de pago",
    accessor: "payment_method",
    Cell: ({ row }) => row.original.method?.name,
  },
  {
    Header: "Fecha de pago",
    accessor: "payment_date",
    Cell: ({ row }) => moment(row.original.payment_date).format("DD/MM/YYYY"),
  },
  {
    Header: "Subtotal",
    accessor: "subtotal",
    Cell: ({ row }) => numberToCurrency(row.original.subtotal),
  },
  {
    Header: "Impuesto",
    accessor: "tax",
    Cell: ({ row }) => numberToCurrency(row.original.tax),
  },
  {
    Header: "Total",
    accessor: "total",
    Cell: ({ row }) => numberToCurrency(row.original.total),
  },
  {
    Header: "Estado",
    accessor: "status",
    Cell: ({ row }) => (<span className={`badge badge-light-${getBadgeColor(row.original.adm_payment_status?.name)} badge-light`}>
      {row.original.adm_payment_status?.name}
    </span>)
  },
  {
    Header: "Referencia",
    accessor: "reference_number",
    Cell: ({ row }) => row.original.reference_number,
  },
  {
    Header: "Notas",
    accessor: "notes",
    Cell: ({ row }) => row.original.notes,
  },
  {
    Header: "Número de cheque",
    accessor: "check_number",
    Cell: ({ row }) => row.original.check_number,
  },
  {
    Header: "Nombre de cheque",
    accessor: "check_name",
    Cell: ({ row }) => row.original.check_name,
  },
  {
    Header: "Acciones",
    id: "actions",
    Cell: ({ row }) => {
      return (
        <div className="px-2">

          {row.original.adm_payment_status_id === 1 &&
          <Dropdown className="btn-group">
            <Dropdown.Toggle
              as="button"
              className="btn btn-secondary btn-sm me-2 mb-2 hover-elevate-down"
            >
              Acciones
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                as={Link}
                to={`/purchases/payments/${row.original.id}/edit`}
              >
                Editar
              </Dropdown.Item>
              <Dropdown.Item>
                <div className="text-danger" onClick={() => {
                  deleteRow(row.original.id).then(helpers.fetchData)
                }}>
                  Eliminar
                </div>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
}
          {/* <Link
            to={`/providers/edit/${row.original.id}`}
            className="btn btn-secondary btn-sm me-2 mb-2 hover-elevate-down"
          >
            Acciones
          </Link> */}
        </div>
      );
    },
  },
];

export { Columns };
