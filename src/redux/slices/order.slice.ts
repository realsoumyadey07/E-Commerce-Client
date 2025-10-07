import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Product } from "./product.slice";
import type { AxiosError } from "axios";
import tokenApi from "@/lib/axios/tokenApi";

export interface Order {
  _id: string;
  userId: {
    name: string
  };
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
  allOredrsForAdmin: Order[] | null;
  order: Order | null;
  isLoading: boolean;
  isAllOrdersForAdminLoading: boolean;
  error: unknown | null;
}

const initialState: OrderState = {
  allOrders: null,
  allOredrsForAdmin: null,
  order: null,
  isLoading: false,
  isAllOrdersForAdminLoading: false,
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

//for admin
export const getAllOrders = createAsyncThunk("order/getAllOrders", async(_, thunkAPI)=> {
  try {
    const res = await tokenApi.get("/order/all-orders");
    return res?.data?.orders;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message ||
          "Something went wrong while fetching all orders"
      );
  }
})

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
    // for admin
    //get all orders
    builder.addCase(getAllOrders.pending, (state) => {
      state.isAllOrdersForAdminLoading = true;
      state.error = null;
    });
    builder.addCase(getAllOrders.fulfilled, (state, action) => {
      state.allOredrsForAdmin = action?.payload as Order[];
      state.isAllOrdersForAdminLoading = false;
    });
    builder.addCase(getAllOrders.rejected, (state, action) => {
      state.error = action?.payload;
      state.isAllOrdersForAdminLoading = false;
    });
  },
});

export default orderSlice.reducer;
