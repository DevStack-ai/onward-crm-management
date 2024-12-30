// @ts-nocheck
import { Column } from "react-table";
import moment from "moment";
import { Link } from "react-router-dom";
// import { useAuth } from "../../../providers";
import Dropdown from "react-bootstrap/Dropdown";
import { toast } from "react-toastify";
import { deleteItem, activateItem } from "./_requests";


export function getTag(situacion: number) {

  if (situacion === 0) return ["Pendiente", "info"];
  if (situacion === 1) return ["Enviado", "warning"];
  if (situacion === 3) return ["Aprobado", "success"];
  if (situacion === 2) return ["Rechazado", "danger"];
  return ["Desconocido", "dark"];

}
const columns = (helpers): ReadonlyArray<Column<Object>> => [
  {
    Header: "No",
    id: "selection",
    accessor: "no"
  },
  {
    Header: "SKU",
    accessor: "art_codigo_interno",
  },
  {
    Header: "Nombre",
    accessor: "art_nombre",
    Cell: ({ value }) => (
      <div style={{ textOverflow: "ellipsis", textWrap: "wrap", maxWidth: "250px"}}>{value}</div>
    )
  },
  {
    Header: "Descripcion",
    accessor: "art_descripcion",
    Cell: ({ value }) => (
      <div style={{ textOverflow: "ellipsis", textWrap: "wrap", maxWidth: "250px"}}>{value}</div>
    )
  },
  {
    Header: "Marca",
    accessor: "inv_marca",
    Cell: ({ value }) => {
      return (<div>{value ? value.mar_nombre : ""}</div>);
    }
  },
  {
    Header: "Proveedor",
    accessor: "inv_proveedor",
    Cell: ({ value }) => {
      return (<div>{value ? value.prov_nombre_comercial : ""}</div>);
    }
  },
  {
    Header: "Categoria",
    accessor: "inv_categoria",
    Cell: ({ value }) => {
      return (<div>{value ? value.cat_nombre : ""}</div>);
    }
  },
  {
    Header: "País",
    accessor: "inv_pais",
    Cell: ({ value }) => {
      return (<div>{value ? value.pai_nombre : ""}</div>);
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
                to={`/products/${row.original.art_codigo}/edit`}
              >
                Editar
              </Dropdown.Item>
              <Dropdown.Item
                className="text-danger"
                onClick={async () => {
                  try {

                    await deleteItem(row.original.art_codigo);
                  } catch (err) {
                    console.error(err);
                  } finally {
                    helpers.fetchData();
                  }
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

export { columns };
