import tokenApi from "@/lib/axios/tokenApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";

export interface Category {
    _id: string;
    category_name: string;
    category_images?: [string]
}

interface InitialState {
    categories: [Category] | null;
    isLoading: boolean;
    error: unknown | null;
}

const initialState: InitialState = {
    categories: null,
    isLoading: false,
    error: null
}

export const createCategory = createAsyncThunk(
    "category/createCategory", async(formData: FormData, thunkAPI)=> {
        try {
            await tokenApi.post("/category/create-category", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
        } catch (error) {
            const err = error as AxiosError<{message: string}>;
            return thunkAPI.rejectWithValue(err?.response?.data?.message || "Something went wrong while creating category");
        }
    }
);

export const getAllCategories = createAsyncThunk(
    "category/getAllCategory",
    async (_, thunkAPI)=> {
        try {
            const res = await tokenApi.get("/category/get-all-categories");
            return res?.data?.categories;
        } catch (error) {
            const err = error as AxiosError<{message: string}>;
            return thunkAPI.rejectWithValue(err?.response?.data?.message || "Something went wrong while getting all categories");
        }
    }
);

export const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
    extraReducers: (builder)=> {
        builder.addCase(getAllCategories.pending, (state)=> {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(getAllCategories.fulfilled, (state, action)=> {
            state.categories = action?.payload;
            state.isLoading = false;
        });
        builder.addCase(getAllCategories.rejected, (state, action)=> {
            state.error = action?.payload;
            state.categories = null;
            state.isLoading = false;
        });
    }
});

export default categorySlice.reducer;