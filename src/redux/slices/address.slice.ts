import tokenApi from "@/lib/axios/tokenApi";
import type { AddressFormData } from "@/screens/CheckoutScreen";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";

export interface Address {
  _id: string;
  userId: string;
  name: string;
  phoneNumber: string;
  pincode: string;
  locality: string;
  area: string;
  city: string;
  district: string;
  state: string;
  landmark: string;
  addressType: "home" | "work";
}

interface AddressState {
  address: Address | null;
  isLoadingAddress: boolean;
  error: unknown | null;
}

const initialState: AddressState = {
  address: null,
  isLoadingAddress: false,
  error: null,
};

export const createAddress = createAsyncThunk(
  "address/createAddress",
  async (addressData: AddressFormData, thunkAPI) => {
    try {
      const res = await tokenApi.post("/address/add-address", addressData);
      return res?.data?.address;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message ||
          "Something went wrong while creating address"
      );
    }
  }
);

export const getMyAddress = createAsyncThunk(
    "address/getMyAddress",
    async (_, thunkAPI) => {
        try {
            const res = await tokenApi.get("/address/get-my-address");
            return res?.data?.address;
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message ||
          "Something went wrong while getting address"
      );
        }
    }
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // add address
    builder.addCase(createAddress.pending, (state) => {
      state.isLoadingAddress = true;
      state.address = null;
      state.error = null;
    });
    builder.addCase(createAddress.fulfilled, (state, action) => {
      state.address = action?.payload as Address;
      state.isLoadingAddress = false;
    });
    builder.addCase(createAddress.rejected, (state, action) => {
      state.error = action?.payload as string;
      state.address = null;
      state.isLoadingAddress = false;
    });
    // get my address
    builder.addCase(getMyAddress.pending, (state) => {
        state.isLoadingAddress = true;
        state.address = null;
        state.error = null;
    });
    builder.addCase(getMyAddress.fulfilled, (state, action) => {
        state.address = action?.payload as Address;
        state.isLoadingAddress = false;
    });
    builder.addCase(getMyAddress.rejected, (state, action) => {
        state.error = action?.payload as string;
        state.isLoadingAddress = false;
    });
  },
});

export default addressSlice.reducer;
