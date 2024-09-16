// @ts-nocheck
import { Column } from "react-table";
import { IndexColumn } from "../../helpers/IndexColumn";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { deleteRow } from "./_requests";
import moment from "moment";
const Columns = (state, helpers): ReadonlyArray<Column<Object>> => [
  {
    Header: "No",
    accessor: "id",
    Cell: ({ row }) => IndexColumn(row.index, state),
    
  },
  {
    Header: "Banco",
    accessor: "bank_name",
    Cell: ({ row }) => row.original.bank?.name,
  },
  {
    Header: 'Prefijo',
    accessor: 'prefix',
  },
  {
    Header: "Nombre",
    accessor: "name",
  },
  {
    Header: "Cuenta",
    accessor: "account_number",
  },
  {
    Header: 'Tipo de cuenta',
    accessor: 'account_type',
    Cell: ({ row }) => row.original.type?.name,

  },
  {
    Header: "Acciones",
    id: "actions",
    Cell: ({ row }) => {
      return (
        <div className="px-2">

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
                to={`/banks/accounts/${row.original.id}/edit`}
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
       
        </div>
      );
    },
  },
];

export { Columns };
