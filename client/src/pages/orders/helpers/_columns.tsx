// @ts-nocheck
import { Column } from "react-table";
import { UserInfoCell } from "./UserInfoCell";
import moment from "moment";
import { Link } from "react-router-dom";
// import { useAuth } from "../../../providers";
import Dropdown from "react-bootstrap/Dropdown";
import { getUserByToken, simulateLogin } from "../../../providers/_requests";
import { toast } from "react-toastify";
import { numberToCurrency } from "../../../utils";
import { downloadOrder } from "../../public/store/helpers/_requests"


export function getTag(situacion: number) {

  if (situacion === 0) return ["Pendiente", "info"];
  if (situacion === 1) return ["Enviado", "warning"];
  if (situacion === 3) return ["Aprobado", "success"];
  if (situacion === 2) return ["Rechazado", "danger"];
  return ["Desconocido", "dark"];

}
const columns = (state, actions): ReadonlyArray<Column<Object>> => [
  {
    Header: "No",
    id: "selection",
    Cell: ({ row }) => <div>{row.index + 1}</div>,
  },
  {
    Header: "# Orden",
    accessor: "ord_codigo",
  },
  {
    Header: "Cliente",
    accessor: "cli_nombre",
    Cell: ({ row }) => row.original.cliente.cli_nombre
  },
  {
    Header: "Total",
    accessor: "ord_total",
    Cell: ({ row }) => numberToCurrency(row.original.ord_total),
  },
  {
    Header: "Situación",
    accessor: "ord_situacion",
    Cell: ({ row }) => {
      const [text, color] = getTag(row.original.ord_situacion);
      return (
        <span className={`badge badge-light-${color} badge-pill`}>{text}</span>
      );
    }
  },
  {
    Header: "Acciones",
    id: "actions",
    Cell: ({ row }) => {
      // const { currentUser, saveAuth, setCurrentUser, logout } = useAuth();
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
                to={`/orders/edit/${row.original.ord_codigo}`}
              >
                Editar
              </Dropdown.Item>
              {/* <Dropdown.Item
                as={Link}
                to={`/orders/details/${row.original.ord_codigo}`}
              >
                Detalles
              </Dropdown.Item> */}

            </Dropdown.Menu>
          </Dropdown>
        </div>
      );
    },
  },
];


const PublicColumns = (state, actions): ReadonlyArray<Column<Object>> => [
  {
    Header: "No",
    id: "selection",
    Cell: ({ row }) => <div>{row.index + 1}</div>,
  },
  {
    Header: "# Orden",
    accessor: "ord_codigo",
  },
  {
    Header: "Cliente",
    accessor: "cli_nombre",
    Cell: ({ row }) => row.original.cliente.cli_nombre
  },
  {
    Header: "Total",
    accessor: "ord_total",
    Cell: ({ row }) => numberToCurrency(row.original.ord_total),
  },
  {
    Header: "Situación",
    accessor: "ord_situacion",
    Cell: ({ row }) => {
      const [text, color] = getTag(row.original.ord_situacion);
      return (
        <span className={`badge badge-light-${color} badge-pill`}>{text}</span>
      );
    }
  },
  {
    Header: "Acciones",
    id: "actions",
    Cell: ({ row }) => {
      // const { currentUser, saveAuth, setCurrentUser, logout } = useAuth();
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
              {row.original.ord_situacion === 1 && <Dropdown.Item
                onClick={() => actions.approveToOrder(row.original.ord_codigo)}
              >
                Aprobar
              </Dropdown.Item>}
              {row.original.ord_situacion === 1 && <Dropdown.Item
                onClick={() => actions.rejectToOrder(row.original.ord_codigo)}
              >
                Rechazar
              </Dropdown.Item>}
              <Dropdown.Item
                onClick={() => downloadOrder(row.original.ord_codigo, "pdf")}
              >
                Descargar PDF
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => downloadOrder(row.original.ord_codigo, "xlsx")}
              >
                Descargar XLSX
              </Dropdown.Item>

            </Dropdown.Menu>
          </Dropdown>
        </div>
      );
    },
  },
];
export { columns, PublicColumns };
