// @ts-nocheck
import { Column } from "react-table";
import { IndexColumn } from "../../helpers/IndexColumn";
import moment from "moment";
import { Link } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import { remove } from "./_requests";

// name
// nit
// address
// billing_address
// contact_name
// contact_phone
// contact_email

const Columns = (state, helpers): ReadonlyArray<Column<Object>> => [
  {
    Header: "No",
    accessor: "adm_department_id",
    Cell: ({ row }) => IndexColumn(row.index, state),
  },
  {
    Header: "Nombre o Razón Social",
    accessor: "name",
  },
  {
    Header: "NIT",
    accessor: "nit",
  },
  {
    Header: "Nombre de contacto",
    accessor: "contact_name",
  },
  {
    Header: "Correo de contacto",
    accessor: "contact_email",
  },
  {
    Header: "Teléfono de contacto",
    accessor: "contact_phone",
  },
  {
    Header: "Dirección",
    accessor: "address",
  },
  {
    Header: "Dirección de facturación",
    accessor: "billing_address",
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
                to={`/clients/${row.original.id}/edit`}
              >
                Editar
              </Dropdown.Item>
              <Dropdown.Item
                className="text-danger"
                onClick={() => {
                  remove(row.original.id).then(helpers.fetchData)
                }}
              >
                Eliminar
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      );
    },
  },
];

export { Columns };
