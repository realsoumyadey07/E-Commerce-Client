import tokenApi from "@/lib/axios/tokenApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";

export interface CategoryImages {
  _id: string;
  url: string;
  public_id: string;
}

export interface Category {
  _id: string;
  category_name: string;
  category_images?: CategoryImages[];
}

interface InitialState {
  categories: [Category] | null;
  category: Category | null;
  isLoading: boolean;
  error: unknown | null;
}

const initialState: InitialState = {
  categories: null,
  category: null,
  isLoading: false,
  error: null,
};

export const createCategory = createAsyncThunk(
  "category/createCategory",
  async (formData: FormData, thunkAPI) => {
    try {
      await tokenApi.post("/category/create-category", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message ||
          "Something went wrong while creating category"
      );
    }
  }
);

export const getAllCategories = createAsyncThunk(
  "category/getAllCategory",
  async (_, thunkAPI) => {
    try {
      const res = await tokenApi.get("/category/get-all-categories");
      return res?.data?.categories;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message ||
          "Something went wrong while getting all categories"
      );
    }
  }
);

export const searchCategory = createAsyncThunk(
  "category/searchCategory",
  async (searchKey: string, thunkAPI) => {
    try {
      const res = await tokenApi.get("/category/search-categories", {
        params: {
          searchKey,
        },
      });
      return res?.data?.category;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message ||
          "Something went wrong while searching category"
      );
    }
  }
);

export const getCategoryById = createAsyncThunk(
  "category/getCategoryById",
  async (categoryId: string, thunkAPI) => {
    try {
      const res = await tokenApi.get(
        `/category/get-categoryById/${categoryId}`
      );
      return res?.data?.category;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message ||
          "Something went wrong while getting category by id"
      );
    }
  }
);

export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async (
    { categoryId, formData }: { categoryId: string; formData: FormData },
    thunkAPI
  ) => {
    try {
      await tokenApi.patch(`/category/edit-category/${categoryId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message ||
          "Something went wrong while updating category"
      );
    }
  }
);

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //get all categories
    builder.addCase(getAllCategories.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getAllCategories.fulfilled, (state, action) => {
      state.categories = action?.payload;
      state.isLoading = false;
    });
    builder.addCase(getAllCategories.rejected, (state, action) => {
      state.error = action?.payload;
      state.categories = null;
      state.isLoading = false;
    });
    //search category
    builder.addCase(searchCategory.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.categories = null;
    });
    builder.addCase(searchCategory.fulfilled, (state, action) => {
      state.categories = action?.payload;
      state.isLoading = false;
    });
    builder.addCase(searchCategory.rejected, (state, action) => {
      state.error = action?.payload;
      state.isLoading = false;
    });
    // get category by Id
    builder.addCase(getCategoryById.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.category = null;
    });
    builder.addCase(getCategoryById.fulfilled, (state, action) => {
      state.category = action?.payload;
      state.isLoading = false;
    });
    builder.addCase(getCategoryById.rejected, (state, action) => {
      state.error = action?.payload;
      state.isLoading = false;
    });
  },
});

export default categorySlice.reducer;

