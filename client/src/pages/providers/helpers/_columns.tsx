// @ts-nocheck
import { Column } from "react-table";
import { IndexColumn } from "../../helpers/IndexColumn";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { deleteProvider } from "./_requests";
const Columns = (state, helpers): ReadonlyArray<Column<Object>> => [
  {
    Header: "No",
    accessor: "id",
    Cell: ({ row }) => IndexColumn(row.index, state),
  },
  {
    Header: "Nit",
    accessor: "nit",
  },
  {
    Header: "Nombre",
    accessor: "name",
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
                to={`/purchases/providers/edit/${row.original.id}`}
              >
                Editar
              </Dropdown.Item>
              <Dropdown.Item>
                <div className="text-danger" onClick={() => {
                  deleteProvider(row.original.id).then(helpers.fetchData)
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
