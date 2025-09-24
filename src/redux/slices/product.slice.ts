import tokenApi from "@/lib/axios/tokenApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import type { Category } from "./category.slice";
import openApi from "@/lib/axios/openApi";

export interface Product {
  _id: string;
  product_name: string;
  category_id: Category;
  price: number;
  description: string;
  quantity: number;
  product_image: string;
  image_public_id: string;
  createdAt: string;
  updatedAt: string;
}

interface InitialState {
  productsData: [Product] | null;
  product: Product | null;
  userSearchedProduts: [Product] | null;
  categorySpecificProducts: [Product] | null;
  editedProduct: Product | null;
  isLoading: boolean;
  error: unknown | null;
}

const initialState: InitialState = {
  productsData: null,
  product: null,
  userSearchedProduts: null,
  categorySpecificProducts: null,
  editedProduct: null,
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
  async (_, thunkAPI) => {
    try {
      const res = await tokenApi.get("/product/get-all-products");
      return res?.data?.products;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message ||
          "Something went wrong while getting products!"
      );
    }
  }
);

export const searchProduct = createAsyncThunk(
  "product/searchProduct",
  async (searchKey: string, thunkAPI) => {
    try {
      const res = await tokenApi.get("/product/search-products", {
        params: {
          searchKey,
        },
      });
      return res?.data?.products;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message ||
          "Something went wrong while searching product!"
      );
    }
  }
);

export const userSearchProducts = createAsyncThunk(
  "product/userSearchProducts",
  async (searchKey: string, thunkAPI) => {
    try {
      const res = await openApi.get(`/product/search?searchKey=${searchKey}`);
      return res?.data?.products;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message ||
          "Something went wrong while searching user search products!"
      );
    }
  }
);

export const productDetails = createAsyncThunk(
  "product/productDetails",
  async (productId: string, thunkAPI) => {
    try {
      const res = await tokenApi.get(`/product/product-details/${productId}`);
      return res?.data?.product;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message ||
          "Something went wrong while searching product!"
      );
    }
  }
);

export const getAllCategoryProducts = createAsyncThunk(
  "product/getAllCategoryProducts",
  async (categoryId: string, thunkAPI)=> {
    try {
      const res = await openApi.get(`/product/get-category-products?categoryId=${categoryId}`);
      return res?.data?.products;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message ||
          "Something went wrong while getting category specific products!"
      );
    }
  }
);

interface EditProductArgs {
  productId: string;
  formData: FormData;
}

interface ProductResponse {
  product: Product; // assuming you have IProduct type
}

export const editProduct = createAsyncThunk<
  Product, // return type
  EditProductArgs, // argument type
  { rejectValue: string } // error type
>("product/editProduct", async ({ productId, formData }, thunkAPI) => {
  try {
    const res = await tokenApi.patch<ProductResponse>(
      `/product/edit-product/${productId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return res.data.product;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return thunkAPI.rejectWithValue(
      err?.response?.data?.message ||
        "Something went wrong while editing product!"
    );
  }
});

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (productId: string, thunkAPI) => {
    try {
      await tokenApi.delete(`/product/delete-product/${productId}`);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message ||
          "Something went wrong while editing product!"
      );
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    // clearSearchedProducts: (state) => {
    //   state.userSearchedProduts = null;
    // },
  },
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
    builder.addCase(getAllProducts.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.productsData = action?.payload;
      state.isLoading = false;
    });
    builder.addCase(getAllProducts.rejected, (state, action) => {
      state.error = action?.payload;
      state.isLoading = false;
    });
    //search products
    builder.addCase(searchProduct.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(searchProduct.fulfilled, (state, action) => {
      state.productsData = action?.payload;
      state.isLoading = false;
    });
    builder.addCase(searchProduct.rejected, (state, action) => {
      state.error = action?.payload;
      state.isLoading = false;
    });
    //product details
    builder.addCase(productDetails.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.product = null;
    });
    builder.addCase(productDetails.fulfilled, (state, action) => {
      state.product = action?.payload;
      state.isLoading = false;
    });
    builder.addCase(productDetails.rejected, (state, action) => {
      state.error = action?.payload;
      state.isLoading = false;
      state.product = null;
    });
    // edit product
    builder.addCase(editProduct.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.editedProduct = null;
    });
    builder.addCase(editProduct.fulfilled, (state, action) => {
      state.editedProduct = action?.payload;
      state.isLoading = false;
    });
    builder.addCase(editProduct.rejected, (state, action) => {
      state.error = action?.payload;
      state.isLoading = false;
    });
    // user search products
    builder.addCase(userSearchProducts.pending, (state) => {
      state.isLoading = true;
      state.userSearchedProduts = null;
      state.error = null;
    });
    builder.addCase(userSearchProducts.fulfilled, (state, action) => {
      state.userSearchedProduts = action?.payload;
      state.isLoading = false;
    });
    builder.addCase(userSearchProducts.rejected, (state, action) => {
      state.error = action?.payload;
      state.isLoading = false;
    });
    // get category specific products
    builder.addCase(getAllCategoryProducts.pending, (state) => {
      state.isLoading = true;
      state.categorySpecificProducts = null;
      state.error = null;
    });
    builder.addCase(getAllCategoryProducts.fulfilled, (state, action) => {
      state.categorySpecificProducts = action?.payload;
      state.isLoading = false;
    });
    builder.addCase(getAllCategoryProducts.rejected, (state, action) => {
      state.error = action?.payload;
      state.isLoading = false;
    });
  },
});

export default productSlice.reducer;
// export const { clearSearchedProducts } = productSlice.actions;
