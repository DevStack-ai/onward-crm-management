// @ts-nocheck
import { Column } from "react-table";
import { UserInfoCell } from "./UserInfoCell";
import moment from "moment";
import { Link } from "react-router-dom";
import { useAuth } from "../../../providers";
import Dropdown from "react-bootstrap/Dropdown";
import { getUserByToken, simulateLogin } from "../../../providers/_requests";
import { toast } from "react-toastify";

const usersColumns: ReadonlyArray<Column<Object>> = [
  {
    Header: "No",
    id: "selection",
    Cell: ({ row }) => <div>{row.index + 1}</div>,
  },
  {
    Header: "Foto",
    id: "photo",
    Cell: ({ ...props }) => <UserInfoCell user={props.data[props.row.index]} />,
  },
  {
    Header: "Nombre",
    accessor: "name",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Perfil",
    accessor: "auth_profile_name",
    Cell: ({ row }) => {
      return (<div>{row.original?.auth_profile?.name}</div>);
    },
  },
  {
    Header: "Última sesión",
    accessor: "last_login",
    Cell: ({ value }) => {
      return (<div>{value ? moment(value).format("DD/MM/YYYY hh:mm A") : ""}</div>);
    },
  },
  {
    Header: "Acciones",
    id: "actions",
    Cell: ({ row }) => {
      const { currentUser, saveAuth, setCurrentUser, logout } = useAuth();
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
                to={`/users/edit/${row.original.id}`}
              >
                Editar
              </Dropdown.Item>
              {currentUser?.auth_profile_id === 1 && (
                <Dropdown.Item>
                  <div onClick={async () => {
                    const { data: auth } = await simulateLogin(row.original.email);
                    const { data: user } = await getUserByToken(auth.token);
                    if (user && user.permissions && user.permissions.length > 0) {
                      const permissions = user.permissions || [];
                      console.log('Permissions', permissions)
                      if (permissions.length > 0) {
                        console.log("has permissions")
                        const previusCompany = localStorage.getItem('currentCompany') ? JSON.parse(localStorage.getItem('currentCompany') as string) : null;
                        if (previusCompany) {
                          console.log('Previous company found', previusCompany)
                          const companyExists = permissions.find(company => company.id === previusCompany.id);
                          console.log('Company exists', companyExists)
                          if (!companyExists) {
                            const currentCompany = permissions[0];
                            console.log('Setting current company', currentCompany)
                            localStorage.setItem('currentCompany', JSON.stringify(currentCompany));
                            user.currentCompany = currentCompany;
                          } else {
                            user.currentCompany = previusCompany;
                          }
                        } else {
                          console.log('No previous company')
                          const currentCompany = permissions[0];
                          localStorage.setItem('currentCompany', JSON.stringify(currentCompany));
                          user.currentCompany = currentCompany;
                        }
                      }
                      saveAuth(auth);
                      setCurrentUser(user);
                      window.location.reload();

                    } else {

                      toast.error('No se encontraron permisos');

                      // setSubmitting(false);
                      // setLoading(false);
                    }
                  }}>
                    Ingresar como
                  </div>
                </Dropdown.Item>
              )}
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

export { usersColumns };
