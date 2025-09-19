import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user.slice";
import productReducer from "./slices/product.slice";
import categoryReducer from "./slices/category.slice";
import cartReducer from "./slices/cart.slice";
import addressReducer from "./slices/address.slice";
import orderReducer from "./slices/order.slice";


export const store = configureStore({
    reducer: {
        user: userReducer,
        product: productReducer,
        category: categoryReducer,
        cart: cartReducer,
        address: addressReducer,
        order: orderReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;