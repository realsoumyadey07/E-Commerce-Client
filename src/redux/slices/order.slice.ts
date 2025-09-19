import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Product } from "./product.slice";
import type { AxiosError } from "axios";
import tokenApi from "@/lib/axios/tokenApi";

export interface Order {
  _id: string;
  userId: string;
  products: {
    productId: Product;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  status: "pending" | "shipped" | "delivered" | "paid" | "cancelled";
  paymentMethod: "cod" | "card" | "upi";
  paymentId?: string;
  shippingAddress: string;
  createdAt: string;
  updatedAt: string;
}

interface OrderState {
  allOrders: Order[] | null;
  order: Order | null;
  isLoading: boolean;
  error: unknown | null;
}

const initialState: OrderState = {
  allOrders: null,
  order: null,
  isLoading: false,
  error: null,
};

export interface IOreder {
  products: { productId: string; quantity: number; price: number }[];
  totalAmount: number;
  paymentMethod: string;
  addressId: string;
  paymentId?: string;
}

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (orderData: IOreder, thunkAPI) => {
    try {
      await tokenApi.post("/order/create-order", orderData);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message ||
          "Something went wrong while creating order"
      );
    }
  }
);

export const getMyOrders = createAsyncThunk(
  "order/getMyOrders",
  async (_, thunkAPI) => {
    try {
      const res = await tokenApi.get("/order/my-orders");
      return res?.data?.orders;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message ||
          "Something went wrong while fetching orders"
      );
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // create order
    builder.addCase(createOrder.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createOrder.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(createOrder.rejected, (state, action) => {
      state.error = action?.payload;
      state.isLoading = false;
    });
    // get my orders
    builder.addCase(getMyOrders.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.allOrders = null;
    });
    builder.addCase(getMyOrders.fulfilled, (state, action) => {
      state.allOrders = action?.payload as Order[];
      state.isLoading = false;
    });
    builder.addCase(getMyOrders.rejected, (state, action) => {
      state.error = action?.payload;
      state.isLoading = false;
    });
  },
});

export default orderSlice.reducer;
