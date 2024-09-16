// @ts-nocheck
import { Column } from "react-table";
import { IndexColumn } from "../../helpers/IndexColumn";
import moment from "moment";
import { Link } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import { ButtonGroup } from "react-bootstrap";

const Columns = (state): ReadonlyArray<Column<Object>> => [
  {
    Header: "No",
    accessor: "adm_department_id",
    Cell: ({ row }) => IndexColumn(row.index, state),
  },
  {
    Header: "Nombre",
    accessor: "name",
  },
  {
    Header: "NIT",
    accessor: "nit",
  },
  {
    Header: "Dirección",
    accessor: "address",
  },
  {
    Header: "Departamento",
    accessor: "adm_department.name",
    Cell: ({ row }) => row.original.adm_department?.name

  },
  {
    Header: "Municipio",
    accessor: "adm_municipality.name",
    Cell: ({ row }) => row.original.adm_municipality?.name
  },
  {
    Header: "Nombre representante legal",
    accessor: "legal_representative_name",
  },
  {
    Header: "Moneda local",
    accessor: "currency",
  },
  {
    Header: "Apertura fiscal",
    accessor: "init_operations_date",
    Cell: ({ value }) => {
      return (
        <div>
          {value ? moment(value, "YYYY-MM-DD").format("DD/MM/YYYY") : ""}
        </div>
      );
    },
  },
  {
    Header: "Tipo de empresa",
    accessor: "adm_company_type_name",
    Cell: ({ row }) => {
      return (
        <div>{row.original.adm_company_type?.name}</div>
      );
    },
  },
  {
    Header: "Número de teléfono",
    accessor: "phone",
  },
  {
    Header: "Régimen ISR",
    accessor: "adm_isr_regime_name",
    Cell: ({ row }) => {
      return (
        <div>{row.original.adm_isr_regime?.name}</div>
      );
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
                to={`/company/${row.original.id}/details`}
              >
                Detalle
              </Dropdown.Item>

              <Dropdown.Item>
                <div className="text-danger" onClick={async () => {
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
