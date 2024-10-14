// @ts-nocheck
import { Column } from "react-table";
import { UserInfoCell } from "./UserInfoCell";
import moment from "moment";
import { Link } from "react-router-dom";
// import { useAuth } from "../../../providers";
import Dropdown from "react-bootstrap/Dropdown";
import { getUserByToken, simulateLogin } from "../../../providers/_requests";
import { toast } from "react-toastify";


export function getTag(situacion: number){
  if(situacion === 2){
    return ["Activo", "success"];
  }
  if(situacion === 1){
    return ["Pendiente", "warning"];
  }
  if(situacion === 0){
    return ["Inactivo", "danger"];
  }

  return ["Desconocido", "dark"];

}
const usersColumns: ReadonlyArray<Column<Object>> = [
  {
    Header: "No",
    id: "selection",
    Cell: ({ row }) => <div>{row.index + 1}</div>,
  },
  {
    Header: "Nombre",
    accessor: "cli_nombre",
  },
  {
    Header: "Abreviación",
    accessor: "cli_abreviacion",
  },
  {
    Header:"Estado",
    accessor: "cli_situacion",
    Cell: ({ value }) => {
      const [text, color] = getTag(value);
      return (
        <span className={`badge badge-light-${color} badge-pill`}>{text}</span>
      );
    },

  },
  {
    Header: "Última sesión",
    accessor: "cli_inicio_sesion",
    Cell: ({ value }) => {
      return (<div>{value ? moment(value).format("DD/MM/YYYY hh:mm A") : ""}</div>);
    },
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
                to={`/users/details/${row.original.cli_codigo}`}
              >
                Detalles
              </Dropdown.Item>
              {/* <Dropdown.Item
                as={Link}
                to={`/users/edit/${row.original.id}`}
              >
                Editar
              </Dropdown.Item>
              */}
              {/* <Dropdown.Item>
                <div className="text-danger" onClick={async () => {
                }}>

                  Eliminar
                </div>
              </Dropdown.Item> */}
            </Dropdown.Menu>
          </Dropdown>

        </div>

      );
    },
  },
];

export { usersColumns };
