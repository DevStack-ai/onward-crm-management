// @ts-nocheck
import { Column } from "react-table";
import moment from "moment";
import { Link } from "react-router-dom";
// import { useAuth } from "../../../providers";
import Dropdown from "react-bootstrap/Dropdown";
import { toast } from "react-toastify";


export function getTag(situacion: number) {
  if (situacion === 2) {
    return ["Activo", "success"];
  }
  if (situacion === 1) {
    return ["Pendiente", "warning"];
  }
  if (situacion === 0) {
    return ["Inactivo", "danger"];
  }

  return ["Desconocido", "dark"];

}
const columns: ReadonlyArray<Column<Object>> = [
  {
    Header: "No",
    accessor: "art_codigo",

  },
  {
    Header: "SKU",
    accessor: "art_codigo_interno",
  },
  {
    Header: "Nombre",
    accessor: "art_nombre",
  },
  {
    Header: "Descripción",
    accessor: "art_descripcion",
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
    Header: "Categoría",
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
  }
  // {
  //   Header: "Abreviación",
  //   accessor: "cli_abreviacion",
  // },
  // {
  //   Header:"Estado",
  //   accessor: "cli_situacion",
  //   Cell: ({ value }) => {
  //     const [text, color] = getTag(value);
  //     return (
  //       <span className={`badge badge-light-${color} badge-pill`}>{text}</span>
  //     );
  //   },

  // },
  // {
  //   Header: "Última sesión",
  //   accessor: "cli_inicio_sesion",
  //   Cell: ({ value }) => {
  //     return (<div>{value ? moment(value).format("DD/MM/YYYY hh:mm A") : ""}</div>);
  //   },
  // },
  // {
  //   Header: "Acciones",
  //   id: "actions",
  //   Cell: ({ row }) => {
  //     // const { currentUser, saveAuth, setCurrentUser, logout } = useAuth();
  //     return (

  //       <div className="px-2">

  //         <Dropdown className="btn-group">
  //           <Dropdown.Toggle
  //             as="button"
  //             className="btn btn-secondary btn-sm me-2 mb-2 hover-elevate-down"
  //           >
  //             Acciones
  //           </Dropdown.Toggle>
  //           <Dropdown.Menu>
  //             <Dropdown.Item
  //               as={Link}
  //               to={`/users/details/${row.original.cli_codigo}`}
  //             >
  //               Detalles
  //             </Dropdown.Item>
  //             {/* <Dropdown.Item
  //               as={Link}
  //               to={`/users/edit/${row.original.id}`}
  //             >
  //               Editar
  //             </Dropdown.Item>
  //             */}
  //             {/* <Dropdown.Item>
  //               <div className="text-danger" onClick={async () => {
  //               }}>

  //                 Eliminar
  //               </div>
  //             </Dropdown.Item> */}
  //           </Dropdown.Menu>
  //         </Dropdown>

  //       </div>

  //     );
  //   },
  // },
];

export { columns };
