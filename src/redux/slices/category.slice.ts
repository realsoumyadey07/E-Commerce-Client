import tokenApi from "@/lib/axios/tokenApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";

interface Category {
    _id: string;
    category_name: string;
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

export const getAllCategories = createAsyncThunk(
    "category/getAllCategory",
    async (_, thunkAPI)=> {
        try {
            const res = await tokenApi.get("/category/get-all-categories");
            return res?.data?.categories;
        } catch (error) {
            const err = error as AxiosError<{message: string}>;
            return thunkAPI.rejectWithValue(err?.response?.data?.message || "Something went wrong while getting all categroies");
        }
    }
)

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