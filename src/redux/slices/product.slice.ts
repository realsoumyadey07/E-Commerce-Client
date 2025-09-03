import tokenApi from "@/lib/axios/tokenApi";
// import type { ProductFormType } from "@/screens/AddProduct";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";

interface Product {
  _id: string;
  product_name: string;
  category_id: string;
  price: number;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

interface InitialState {
  productsData: [Product] | null;
  product: Product | null;
  isLoading: boolean;
  error: unknown | null;
}

const initialState: InitialState = {
  productsData: null,
  product: null,
  isLoading: false,
  error: null,
};

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (formData: FormData, thunkAPI) => {
    try {
      const res = await tokenApi.post("/product/create-product", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res?.data?.product;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message ||
          "Something went wrong while creating product"
      );
    }
  }
);

export const getAllProducts = createAsyncThunk(
  "product/getAllProducts",
  async (_, thunkAPI)=> {
    try {
      const res = await tokenApi.get("/product/get-all-products");
      return res?.data?.products;
    } catch (error) {
      const err = error as AxiosError<{message: string}>;
      return thunkAPI.rejectWithValue(err?.response?.data?.message || "Something went wrong while getting products!");
    }
  }
)

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // create product
    builder.addCase(createProduct.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createProduct.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      state.error = action?.payload;
      state.isLoading = false;
    });
    // get products
    
  },
});

export default productSlice.reducer;
