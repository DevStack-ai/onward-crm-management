// @ts-nocheck
import { Column } from "react-table";
import { IndexColumn } from "../../helpers/IndexColumn";
// import { unassignAccountant } from "../../company/components/_requests";
import { toast } from "react-toastify";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";

const Columns = (state, props, actions): ReadonlyArray<Column<Object>> => [
  {
    Header: "No",
    accessor: "index",
    Cell: ({ row }) => IndexColumn(row.index, state),
  },
  {
    Header: "Tipo",
    accessor: "tipo",
    Cell: ({ row }) => row?.original?.tipo?.cat_descripcion,
  },
  {
    Header: "Primera línea",
    accessor: "add_calle",
  },
  {
    Header: "Segunda línea",
    accessor: "add_calle_2",
  },
  {
    Header: "Ciudad",
    accessor: "add_ciudad",
  },
  {
    Header: "Estado",
    accessor: "add_estado",
    Cell: ({ row }) => row?.original?.estado?.est_nombre,
  },
  {
    Header: "Código postal",
    accessor: "add_zipcode",
  },
  {
    Header: "Defecto",
    accessor: "add_defecto",
    Cell: ({ row }) => (row?.original?.add_defecto ? "Sí" : "No"),
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
                to={`/users/details/${props.cliente}/address/edit/${row.original.add_codigo}`}
              >
                Editar
              </Dropdown.Item>
              {row.original.add_defecto !== 1 && (
                <Dropdown.Item
                  onClick={async () => actions.deleteAddress(row.original.add_codigo)}
                >
                  Eliminar
                </Dropdown.Item>
              )}
              {row.original.add_defecto !== 1 && (
                <Dropdown.Item
                  onClick={async () => actions.setDefaultAddress(row.original.add_codigo)}
                >
                  Establecer como defecto
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      );
    },
  },
];


const ContactColumns = (state, props, actions): ReadonlyArray<Column<Object>> => [
  {
    Header: "No",
    accessor: "index",
    Cell: ({ row }) => IndexColumn(row.index, state),
  },
  {
    Header: "Nombre",
    accessor: "con_nombre",
  },
  {
    Header: "Correo",
    accessor: "con_email",
  },
  {
    Header: "Teléfono",
    accessor: "con_telefono_1",
  },
  {
    Header: "Puesto",
    accessor: "con_cargo",
  },
  {
    Header: "Defecto",
    accessor: "con_defecto",
    Cell: ({ row }) => (row?.original?.con_defecto ? "Sí" : "No"),
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
                to={`/users/details/${props.cliente}/contacts/edit/${row.original.con_codigo}`}
              >
                Editar
              </Dropdown.Item>
              {row.original.con_defecto !== 1 && (
                <Dropdown.Item
                  onClick={async () => actions.deleteContact(row.original.con_codigo)}
                >
                  Eliminar
                </Dropdown.Item>
              )}
              {row.original.con_defecto !== 1 && (
                <Dropdown.Item
                  onClick={async () => actions.setDefaultContact(row.original.con_codigo)}
                >
                  Establecer como defecto
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </div>

      );
    },
  },
];


export { Columns, ContactColumns };
