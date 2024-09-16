function generateBasicTypes(table: string) {
  return {
    TABLE_DATA: `SET_${table.toUpperCase()}_TABLE_DATA`,
    IS_CREATING: `SET_${table.toUpperCase()}_IS_CREATING`,
    FILTER_VALUES: `SET_${table.toUpperCase()}_FILTER_VALUES`,
  };
}

const initialState = {
  dataList: [],
  page: 1,
  itemsPerPage: 30,
  pages: 1,
  total: 0,
  filters: {},
  isFirstTime: true,
  isCreating: false,
};

export { generateBasicTypes, initialState };
