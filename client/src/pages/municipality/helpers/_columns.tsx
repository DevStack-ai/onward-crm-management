// @ts-nocheck
import { Column } from "react-table";
const Columns = (state): ReadonlyArray<Column<Object>> => [
  {
    Header: "No",
    accessor: "adm_department_id",
    Cell: ({ row }) => {
      const itemIndex = state.page > 1 ? ((state.page - 1) * state.itemsPerPage) + ((row.index) + 1) : ((row.index) + 1);
      return <div>{itemIndex}</div>;
    },
  },
  {
    Header: "Nombre",
    accessor: "name",
  },
  {
    Header: "Departamento",
    accessor: "adm_department_name",
    Cell: ({ row }) => {
      return <div>{row.original?.adm_department?.name}</div>;
    },
  },

  // {
  //   Header: "Acciones",
  //   id: "actions",
  //   Cell: ({ row }) => {
  //     return (
  //       <div className="px-2">
  //         <a
  //           href="#"
  //           className="btn btn-secondary btn-sm me-2 mb-2 hover-elevate-down"
  //         >
  //           Editar
  //         </a>
  //       </div>
  //     );
  //   },
  // },
];

export { Columns };
