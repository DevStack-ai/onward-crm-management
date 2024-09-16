// @ts-nocheck
import { Column } from "react-table";
import { IndexColumn } from "../../../helpers/IndexColumn";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import moment from "moment";
import { numberToCurrency } from "utils/index";

const Columns = (state, helpers): ReadonlyArray<Column<Object>> => [
  {
    Header: "No",
    accessor: "id",
    Cell: ({ row }) => IndexColumn(row.index, state),
  },
  {
    Header: "Nombre",
    accessor: "name",
  },
  {
    Header: "Periodo",
    accessor: "period",
    Cell: ({ row }) => row.original.plan_period?.name,
  },
  {
    Header: "Tipo de Pago",
    accessor: "payment_type",
    Cell: ({ row }) => row.original.plan_type?.name,

  },
  {
    Header: "Precio",
    accessor: "price",
    Cell: ({ value }) => {
      return (
        <div>
          {value ? numberToCurrency(value) : ""}
        </div>
      );
    },
  },
  {
    Header: "Maximo de empresas",
    accessor: "max_companies",
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
                to={`/super/plans/${row.original.id}/edit`}
              >
                Editar
              </Dropdown.Item>
              {/* <Dropdown.Item
                className="text-danger"
              >
                Eliminar
              </Dropdown.Item> */}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      );
    },
  },
];

export { Columns };
