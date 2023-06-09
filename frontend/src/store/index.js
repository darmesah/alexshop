import { configureStore } from "@reduxjs/toolkit";

import uiReducer from "./ui-slice";
import cartReducer from "./cart-slice";
import productReducer from "./product-slice";
import authReducer from "./auth-slice";
import userReducer from "./user-slice";
import orderReducer from "./order-slice";
import adminReducer from "./admin-slice";

const store = configureStore({
  reducer: {
    product: productReducer,
    ui: uiReducer,
    cart: cartReducer,
    auth: authReducer,
    user: userReducer,
    order: orderReducer,
    admin: adminReducer,
  },
});

export default store;
