import { createSlice } from "@reduxjs/toolkit";

interface Product {
  _id: string;
  product_name: string;
  category_id: string;
  price: number;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
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


export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {}
}) 