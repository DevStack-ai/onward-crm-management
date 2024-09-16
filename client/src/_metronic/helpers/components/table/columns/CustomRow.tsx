// @ts-nocheck
import clsx from "clsx";

type Props = {
  row: Object;
  popUpController?;
};

const CustomRow = ({ row, popUpController }: Props) => (
  <tr {...row.getRowProps()}>
    {row.cells.map((cell) => {
      return (
        <td
          {...cell.getCellProps()}
   
          className={clsx({
            "text-end min-w-100px": cell.column.id === "actions",
          })}
        >
          {cell.render("Cell")}
        </td>
      );
    })}
  </tr>
);

export { CustomRow };
