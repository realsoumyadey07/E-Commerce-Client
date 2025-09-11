import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user.slice";
import productReducer from "./slices/product.slice";
import categoryReducer from "./slices/category.slice";
import cartReducer from "./slices/cart.slice";


export const store = configureStore({
    reducer: {
        user: userReducer,
        product: productReducer,
        category: categoryReducer,
        cart: cartReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;