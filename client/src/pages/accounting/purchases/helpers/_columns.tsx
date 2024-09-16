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
    Header: "Cuenta",
    accessor: "account",
    Cell: ({ row }) => `${row.original?.act_account?.full_code} - ${row.original?.act_account?.name}`,
  },
  {
    Header: "Descripción",
    accessor: "description",
  },
  {
    Header: "Monto",
    accessor: "amount",
    Cell: ({ row }) => numberToCurrency(row.original.amount),
  },
  {
    Header: "Fecha de compra",
    accessor: "date",
    Cell: ({ row }) => moment(row.original.date).format("DD/MM/YYYY"),
  },
  {
    Header: "Fecha de contabilización",
    accessor: "accounting_date",
    Cell: ({ row }) => moment(row.original.accounting_date).format("DD/MM/YYYY"),
  },
  {
    Header: "Tipo de registro",
    accessor: "adm_purchase_type",
    Cell: ({ row }) => row.original?.adm_purchase_type?.name,

  },
  {
    Header: "Tipo de documento",
    accessor: "adm_document_type",
    Cell: ({ row }) => row.original?.adm_document_type?.name,
  },
  {
    Header: "Proveedor",
    accessor: "adm_provider",
    Cell: ({ row }) => row.original?.adm_provider && `${row.original?.adm_provider?.nit} - ${row.original?.adm_provider?.name}`,
  },
  {
    Header: "Sucursal",
    accessor: "adm_branch",
    Cell: ({ row }) => row.original?.adm_branch?.name,
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
                to={`/purchases/purchases/${row.original.id}/edit`}
              >
                Editar
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to={`/purchases/payments/create?purchase_id=${row.original.id}`}
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
