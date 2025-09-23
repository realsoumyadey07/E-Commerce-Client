import tokenApi from "@/lib/axios/tokenApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";

interface Wishlist {
  userId: string;
  products: string[];
  createdAt: string;
  updatedAt: string;
}

interface WishlistStates {
  allWishlists: Wishlist | null;
  isLoadingList: boolean;
  idAddingToWishlist: boolean;
  isRemovingFromWishlist: boolean;
  error: unknown | null;
}

const initialState: WishlistStates = {
  allWishlists: null,
  isLoadingList: false,
  idAddingToWishlist: false,
  isRemovingFromWishlist: false,
  error: null,
};

export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async ({ productId }: { productId: string }, thunkAPI) => {
    try {
      await tokenApi.post("/wishlist/add-to-wishlist", { productId });
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message ||
          "Something went wrong while getting all wishlists"
      );
    }
  }
);

export const getAllWishlists = createAsyncThunk(
  "wishlist/getAllWishlists",
  async (_, thunkAPI) => {
    try {
      const res = await tokenApi.get("/wishlist/get-my-wishlists");
      return res?.data?.wishlists;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message ||
          "Something went wrong while getting all wishlists"
      );
    }
  }
);

export const removeFromWishlist = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async ({ productId }: { productId: string }, thunkAPI) => {
    try {
      const res = await tokenApi.delete("/wishlist/remove-from-wishlist", {
        data: {
          productId,
        },
      });
      return res?.data?.wishlist;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message ||
          "Something went wrong while getting all wishlists"
      );
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //get all wishlists
    builder.addCase(getAllWishlists.pending, (state) => {
      state.isLoadingList = true;
      state.allWishlists = null;
    });
    builder.addCase(getAllWishlists.fulfilled, (state, action) => {
      state.allWishlists = action?.payload;
      state.isLoadingList = false;
    });
    builder.addCase(getAllWishlists.rejected, (state, action) => {
      state.error = action?.payload;
      state.isLoadingList = false;
    });
    // adding to wishlist
    builder.addCase(addToWishlist.pending, (state) => {
      state.idAddingToWishlist = true;
    });
    builder.addCase(addToWishlist.fulfilled, (state) => {
      state.idAddingToWishlist = false;
    });
    builder.addCase(addToWishlist.rejected, (state, action) => {
      state.error = action?.payload;
      state.idAddingToWishlist = false;
    });
    // removing product from wishlist
    builder.addCase(removeFromWishlist.pending, (state) => {
      state.isRemovingFromWishlist = true;
      state.error = null;
    });
    builder.addCase(removeFromWishlist.fulfilled, (state, action) => {
      state.allWishlists = action?.payload;
      state.isRemovingFromWishlist = false;
    });
    builder.addCase(removeFromWishlist.rejected, (state, action) => {
      state.error = action?.payload;
      state.isRemovingFromWishlist = false;
    });
  },
});

export default wishlistSlice.reducer;
