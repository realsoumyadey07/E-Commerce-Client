import tokenApi from "@/lib/axios/tokenApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";

export interface Cart {
  _id: string;
  userId: string;
  productId: string;
  quantity: string;
  createdAt: string;
  updatedAt: string;
}

interface InitialState {
  allCarts: Cart[] | null;
  cart: Cart | null;
  isLoading: boolean;
  error: unknown | null;
}

const initialState: InitialState = {
  allCarts: null,
  cart: null,
  isLoading: false,
  error: null,
};

interface AddToCartParams {
  userId: string;
  productId: string;
}

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (formData: AddToCartParams, thunkAPI) => {
    try {
        await tokenApi.post("/cart/add-cart", formData);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message ||
          "Something went wrong while adding to cart"
      );
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addToCart.pending, (state)=> {
        state.isLoading = true;
        state.error = null;
    });
    builder.addCase(addToCart.fulfilled, (state)=> {
        state.isLoading = false;
    });
    builder.addCase(addToCart.rejected, (state, action)=> {
        state.error = action?.payload;
        state.isLoading = false;
    })
  },
});
