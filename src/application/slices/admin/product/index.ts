import { createSlice } from "@reduxjs/toolkit";
import { Product } from "@/domain/models";
import { createProductSlice } from "./createProductSlice";
import { getAllProductSlices } from "./getAllProductSlices";
import { updateProductSlice } from "./updateProductSlice";
import { deleteProductSlice } from "./deleteProductSlice";

interface ProductSliceState {
  products: Product[];
  selectedProductSlice: Product | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductSliceState = {
  products: [],
  selectedProductSlice: null,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "Product",
  initialState,
  reducers: {
    setSelectedProductSlice: (state, action) => {
      state.selectedProductSlice = action.payload;
    },
    clearSelectedProductSlice: (state) => {
      state.selectedProductSlice = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createProductSlice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProductSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(createProductSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Get All
      .addCase(getAllProductSlices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProductSlices.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getAllProductSlices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update
      .addCase(updateProductSlice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProductSlice.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.products.findIndex(
          (am) => am.id === action.payload.id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(updateProductSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete
      .addCase(deleteProductSlice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProductSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(
          (am) => am.id !== Number(action.payload)
        );
      })
      .addCase(deleteProductSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedProductSlice, clearSelectedProductSlice } =
  productSlice.actions;
export default productSlice.reducer;
