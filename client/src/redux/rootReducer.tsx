import { combineReducers } from "redux";
import clients from "./reducers/clients/reducer";
import orders from "./reducers/orders/reducer";
import products from "./reducers/products/reducer";

export const rootReducer = combineReducers({
  // _permissions: _permisions,
  orders: orders,
  users: clients,
  products: products,

});
