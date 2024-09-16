import { useMemo } from "react";
import { Column, useTable } from "react-table";
import clsx from "clsx";

import { ListLoading } from "./components/loading/ListLoading";
import { Pagination } from "./components/pagination/ListPagination";
import { ListHeader } from "./components/header/ListHeader";

type BasicTableProps = {
  dataList: Array<Object>;
  columnsList: ReadonlyArray<Column<Object>>;
  isLoading: Boolean;

  page: number;
  setPage: (arg: any) => void;
  itemsPerPage: number;
  setItemsPerPage: (arg: any) => void;
  total: number;
  pages: number;
  headerAddButton?: boolean;

  customHeight?: number;
  customWidth?: number;

  children?: JSX.Element;
  toolbar?: JSX.Element;
};

function BasicTable(props: BasicTableProps) {
  const { dataList, columnsList, isLoading, children, toolbar } = props;

  const { headerAddButton } = props;

  const data = useMemo(() => {
    if (Array.isArray(dataList)) {
      return dataList
    } else {
      console.log("dataList is not an array")
      console.log(dataList)
      return []
    }
  }, [dataList]);
  const columns = useMemo(() => [...columnsList], [columnsList]);

  const { getTableProps, getTableBodyProps, headers, rows, prepareRow } =
    useTable({
      columns,
      data,
    });
  return (
    <>
      <div className="card border-0 p-0 m-0">
        <ListHeader headerAddButton={headerAddButton} toolbar={toolbar}>
          {children ? children : null}
        </ListHeader>
      </div>

      <div className="px-10 pt-2">
        <div
          className="table-responsive"
          style={{ maxHeight: "70vh", minHeight: "20vh", maxWidth: "100%", overflowX: "auto" }}
        >
          <table
            id="kt_table_users"
            className="table table-hover align-middle table-row-dashed tableFixHead"
            {...getTableProps()}
          >
            <thead>
              <tr
                key={"header"}
                className={"fw-bolder fs-7 text-uppercase gs-0 text-gray-700"}
              >
                {headers.map((column, index) => (
                  <th
                    {...column.getHeaderProps({
                      className: column.id !== "actions"
                        ? "text-start"
                        : "text-end px-4",
                      style: (column.id !== "actions" && column.Header !== "No") ? { minWidth: "125px", maxWidth: "300px" } : {},
                    })}
                    key={`header-${index}`}
                  >
                    {column.render("Header")}
                  </th>

                ))}
              </tr>
            </thead>
            {isLoading && <ListLoading />}
            <tbody className="text-gray-600 fw-bold" {...getTableBodyProps()}>
              {rows.map((row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} key={`row-${i}`} >
                    {row.cells.map((cell, i) => (
                      <td {...cell.getCellProps()} key={`cell-${i}`}
                        className={clsx({
                          "text-end": cell.column.id === "actions",
                        })}
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}

            </tbody>
          </table>
          {rows.length === 0 && (
            <div className="d-flex text-center w-100 align-content-center justify-content-center">
              No hay datos
            </div>)}
        </div>
        {props.pages !== null && <div className="d-flex justify-content-between pt-4">
          <div className="d-flex align-items-center h-100">
            <select
              value={props.itemsPerPage}
              onChange={(e) => {
                props.setItemsPerPage(Number(e.target.value));
              }}
              className="form-select form-select-sm form-select-solid w-75px me-4"
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={`size-${pageSize}`} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
            {!!props.pages && <span className="text-gray-700">
              Página {props.page} de {props.pages}
            </span>}
          </div>
          {!!props.pages && <Pagination
            totalCount={props.total}
            pageSize={props.itemsPerPage}
            currentPage={props.page}
            onPageChange={props.setPage}
          />}
        </div>}

      </div>
    </>
  );
}

export { BasicTable };
