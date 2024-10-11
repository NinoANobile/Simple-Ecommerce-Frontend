import { combineReducers } from "@reduxjs/toolkit";
import usersReducer from "../app/features/users/usersSlice";
import productsReducer from "../app/features/products/productsSlice";
import cartReducer from "../app/features/cart/cartSlice";
import authReducer from "../app/features/auth/authSlice";
import ordersReducer from "../app/features/orders/ordersSlice";
import productFilterReducer from "../app/features/productFilter/productFilterSlice";

const rootReducer = combineReducers({
  users: usersReducer,
  products: productsReducer,
  cart: cartReducer,
  auth: authReducer,
  orders: ordersReducer,
  productFilter: productFilterReducer,
});

export default rootReducer;
