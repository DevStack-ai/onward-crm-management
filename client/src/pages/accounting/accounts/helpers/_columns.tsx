// @ts-nocheck
import { Column } from "react-table";
import { IndexColumn } from "../../../helpers/IndexColumn";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { deleteRow } from "./_requests";
const Columns = (state, helpers): ReadonlyArray<Column<Object>> => [
  {
    Header: "No",
    accessor: "id",
    Cell: ({ row }) => IndexColumn(row.index, state),
  },
  {
    Header: "Código",
    accessor: "full_code",
  },
  {
    Header: "Nombre",
    accessor: "name",
  },
  {
    Header: "Cuenta Padre",
    accessor: "parent",
    Cell: ({ value }) => {
      return value ? value.name : "";
    },
  },
  {
    Header: "Tiene movimientos",
    accessor: "has_movement",
    Cell: ({ value }) => {
      return value ? "Si" : "No";
    },
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
                to={`/accounts/${row.original.id}/edit`}
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
