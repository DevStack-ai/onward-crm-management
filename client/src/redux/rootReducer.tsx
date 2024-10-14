import { combineReducers } from "redux";
import clients from "./reducers/clients/reducer";
import orders from "./reducers/orders/reducer";

export const rootReducer = combineReducers({
  // _permissions: _permisions,
  orders: orders,
  users: clients,

});
