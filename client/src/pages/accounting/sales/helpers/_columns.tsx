// @ts-nocheck
import { Column } from "react-table";
import { IndexColumn } from "../../../helpers/IndexColumn";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { deleteRow } from "./_requests";
import { numberToCurrency } from "utils/index";
import moment from "moment";

const Columns = (state, helpers): ReadonlyArray<Column<Object>> => [
  {
    Header: "No",
    accessor: "id",
    Cell: ({ row }) => IndexColumn(row.index, state),
  },
  {
    Header: "Cliente",
    accessor: "client",
    Cell: ({ row }) => row.original?.client?.name,
  },
  {
    Header: "Cuenta",
    accessor: "account",
    Cell: ({ row }) => `${row.original?.account?.full_code} - ${row.original?.account?.name}`,
  },
  {
    Header: "Referencia",
    accessor: "reference",
  },


  {
    Header: "Fecha de vencimiento",
    accessor: "due_date",
    Cell: ({ row }) => moment(row.original.due_date).format("DD/MM/YYYY"),
  },

  {
    Header: "Fecha de contabilización",
    accessor: "accounting_date",
    Cell: ({ row }) => moment(row.original.accounting_date).format("DD/MM/YYYY"),
  },
  {
    Header: "Serie",
    accessor: "serie",
  },
  {
    Header: "Folio",
    accessor: "folio",
  },

  {
    Header: "Sucursal",
    accessor: "adm_branch",
    Cell: ({ row }) => row.original?.adm_branch?.name,
  },
  {
    Header: "Total",
    accessor: "amount",
    Cell: ({ row }) => numberToCurrency(row.original.amount),
  },
  {
    Header: "Estado",
    accessor: "is_paid",
    Cell: ({ row }) => (
      <div className={`badge badge-light-${row.original.is_paid ? "success" : "danger"} badge-light`}>
        {row.original.is_paid ? "Pagado" : "Pendiente"}
      </div>)
  },
  {
    Header: 'Balance',
    accessor: 'balance',
    Cell: ({ row }) => numberToCurrency(row.original.balance)
  },

  {
    Header: "Acciones",
    id: "actions",
    Cell: ({ row }) => {
      return (
        <div className="px-2 z-index-9999">
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
                to={`/sales/sales/${row.original.id}/edit`}
              >
                Editar
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to={`/sales/payments/create?sale_id=${row.original.id}`}
              >
                Agregar pago
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
        </div>
      );
    },
  },
];

export { Columns };
