import { generateBasicTypes } from "../helpers";

const types = generateBasicTypes("admins");
type DataState = {
  dataList?: Array<{}>;
  filters?: Object,
  page?: number;
  itemsPerPage?: number;
  total?: number;
  pages?: number;
};
type setDataTable = (
  args: {
    type: string;
    payload: DataState;
  },
) => void;

export const setDataTable = (newState: DataState) => {
  return (dispatch: setDataTable) => {
    dispatch({
      type: types.TABLE_DATA,
      payload: newState,
    });
  };
};
