import { generateBasicTypes, initialState } from "../helpers";


const userReducers = (state = initialState, action: any) => {
  const types = generateBasicTypes("users");

  switch (action.type) {
    case types.TABLE_DATA:
      return {
        ...state,
        ...action.payload,
        isFirstTime: false,
        isCreating: false,
      };
    case types.IS_CREATING:
      return {
        ...state,
        isCreating: true,
      };

    case types.FILTER_VALUES:
      return {
        ...state,
        filters: action.payload,
      };
    default:
      return state;
  }
};

export default userReducers
