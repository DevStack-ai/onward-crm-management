// @ts-nocheck
import { Column } from "react-table";
import { UserInfoCell } from "./UserInfoCell";
import moment from "moment";
import { Link } from "react-router-dom";
// import { useAuth } from "../../../providers";
import Dropdown from "react-bootstrap/Dropdown";
import { getUserByToken, simulateLogin } from "../../../providers/_requests";
import { toast } from "react-toastify";


export function getTag(situacion: number) {

  if (situacion === 0) return ["Pendiente", "info"];
  if (situacion === 1) return ["Enviado", "warning"];
  if (situacion === 3) return ["Aprobado", "success"];
  if (situacion === 2) return ["Rechazado", "danger"];
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
    accessor: "adm_nombre",
  },
  {
    Header: "Usuario",
    accessor: "adm_usuario",
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
              {/* <Dropdown.Item
                as={Link}
                to={`/users/details/${row.original.cli_codigo}`}
              >
                Detalles
              </Dropdown.Item>
             {!row.original.cli_usuario && <Dropdown.Item
                as={Link}
                to={`/users/details/${row.original.cli_codigo}/approve`}
              >
                Aprobar
              </Dropdown.Item>} */}
              <Dropdown.Item
                as={Link}
                to={`/admins/details/${row.original.adm_codigo}/reset-password`}
              >
                Cambiar contraseña
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
