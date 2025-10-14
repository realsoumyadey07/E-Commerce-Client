import openApi from "@/lib/axios/openApi";
import tokenApi from "@/lib/axios/tokenApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import type { Product } from "./product.slice";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface UserForAdmin extends User {
  address?: {
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
  },
  orders?: {
    _id: string;
    products: {
      productId: Product[];
      quantity: number;
      price: number;
      _id: string;
    }[];
    totalAmount: number;
    status: "pending" | "shipped" | "paid" | "delivered" | "cancelled";
    paymentMethod: "cod" | "card" | "upi";
    createdAt: string;
    updatedAt: string;
    __v: number;
  }[]
}

interface UserSlice {
  registerUserData: User | null;
  loginUserData: User | null;
  userData: User | null;
  userDetailsForAdmin: UserForAdmin | null;
  isLoading: boolean;
  isUserDetailsForAdminLoading: boolean;
  error: unknown | null;
}

const initialState: UserSlice = {
  registerUserData: null,
  loginUserData: null,
  userData: null,
  userDetailsForAdmin: null,
  isLoading: false,
  isUserDetailsForAdminLoading: false,
  error: null,
};

export interface FormType {
  name?: string;
  email: string;
  password: string;
}

export const userRegistration = createAsyncThunk(
  "user/userRegistration",
  async (formData: FormType, thunkAPI) => {
    try {
      const res = await openApi.post("/user/user-registration", {
        name: formData?.name,
        email: formData?.email,
        password: formData?.password,
      });
      const data = res.data;
      return data?.user;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return thunkAPI.rejectWithValue(
        error?.response?.data || "Something went wrong while registration"
      );
    }
  }
);

export const userLogin = createAsyncThunk(
  "user/userLogin",
  async (formData: FormType, thunkAPI) => {
    try {
      const res = await tokenApi.post("/user/user-login", {
        email: formData?.email,
        password: formData?.password,
      });
      const data = await res.data;
      if (data?.user?.role === "admin") {
        window.localStorage.setItem("isAdmin", "true");
      }
      return data?.user;
    } catch (err) {
      console.log(err);
      const error = err as AxiosError<{ message: string }>;
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Something went wrong while login"
      );
    }
  }
);

export const userLogout = createAsyncThunk(
  "user/userLogout",
  async (_, thunkAPI) => {
    try {
      const res = await tokenApi.get("/user/user-logout");
      if (res?.data?.user?.role === "admin") {
        window.localStorage.removeItem("isAdmin");
      }
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message || "Something went wrong while login"
      );
    }
  }
);

export const userProfile = createAsyncThunk(
  "user/userProfile",
  async (_, thunkAPI) => {
    try {
      const res = await tokenApi.get("/user/user-profile");
      return res?.data?.user;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message ||
          "Something went wrong while getting user profile"
      );
    }
  }
);

//for admin
export const getUserProfileById = createAsyncThunk(
  "user/getUserProfileById",
  async (userId: string, thunkAPI) => {
    try {
      const res = await tokenApi.get(`/user/get-user/${userId}`);
      return res?.data?.user;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message ||
          "Something went wrong while getting user data by id"
      );
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserData: (state) => {
      state.userData = null;
    },
  },
  extraReducers: (builder) => {
    //register
    builder.addCase(userRegistration.pending, (state) => {
      state.isLoading = true;
      state.registerUserData = null;
      state.error = null;
    });
    builder.addCase(userRegistration.fulfilled, (state, action) => {
      state.registerUserData = action?.payload;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(userRegistration.rejected, (state, action) => {
      state.error = action?.payload;
      state.isLoading = false;
    });
    //login
    builder.addCase(userLogin.pending, (state) => {
      state.isLoading = true;
      state.loginUserData = null;
      state.error = null;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.loginUserData = action?.payload;
      state.isLoading = false;
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.error = action?.payload;
      state.isLoading = false;
    });
    //logout
    builder.addCase(userLogout.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(userLogout.fulfilled, (state) => {
      state.userData = null;
      state.isLoading = false;
    });
    builder.addCase(userLogout.rejected, (state, action) => {
      state.error = action?.payload;
      state.isLoading = false;
    });
    //profile
    builder.addCase(userProfile.pending, (state) => {
      state.isLoading = true;
      state.userData = null;
      state.error = null;
    });
    builder.addCase(userProfile.fulfilled, (state, action) => {
      state.userData = action?.payload;
      state.error = null;
      state.isLoading = false;
    });
    builder.addCase(userProfile.rejected, (state, action) => {
      state.error = action?.payload;
      state.isLoading = false;
    });
    // for admin
    // get user details by id
    builder.addCase(getUserProfileById.pending, (state) => {
      state.isUserDetailsForAdminLoading = true;
      state.error = null;
    });
    builder.addCase(getUserProfileById.fulfilled, (state, action) => {
      state.userDetailsForAdmin = action?.payload;
      state.error = null;
      state.isUserDetailsForAdminLoading = false;
    });
    builder.addCase(getUserProfileById.rejected, (state, action) => {
      state.error = action?.payload;
      state.isUserDetailsForAdminLoading = false;
    });
  },
});

export default userSlice.reducer;
export const { clearUserData } = userSlice.actions;
