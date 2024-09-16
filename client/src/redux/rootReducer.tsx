import { combineReducers } from "redux";
import users from "./reducers/users/reducer";


export const rootReducer = combineReducers({
  // _permissions: _permisions,

  users: users,

});
