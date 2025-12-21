import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/domain/models";

import {
  CreateProductRepository,
  DeleteProductRepository,
  GetAllProductRepository,
  UpdateProductRepository,
  UpdateProductStockRepository,
} from "@/infrastructure/repositories/product";
import {
  CreateProductUseCase,
  DeleteProductUseCase,
  GetAllProductUseCase,
  UpdateProductUseCase,
  UpdateProductStockUseCase,
} from "@/domain/usecases/product";

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

export const createProductSlice = createAsyncThunk(
  "product/create",
  async (data: Omit<Product, "id">, { rejectWithValue }) => {
    try {
      const createProductRepository = new CreateProductRepository();
      const createProductUseCase = new CreateProductUseCase(
        createProductRepository
      );
      const result = await createProductUseCase.execute(data);
      return result;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const getAllProductSlices = createAsyncThunk(
  "product/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const getAllProductRepository = new GetAllProductRepository();
      const getAllProductUseCase = new GetAllProductUseCase(
        getAllProductRepository
      );
      const result = await getAllProductUseCase.execute();
      return result;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const updateProductSlice = createAsyncThunk(
  "product/update",
  async (
    { id, data }: { id: number; data: Partial<Product> },
    { rejectWithValue }
  ) => {
    try {
      const updateProductRepository = new UpdateProductRepository();
      const updateProductUseCase = new UpdateProductUseCase(
        updateProductRepository
      );
      const result = await updateProductUseCase.execute(id, data);
      return result;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const updateProductStockSlice = createAsyncThunk(
  "product/updateStock",
  async (data: { id: number; newStock: number }[], { rejectWithValue }) => {
    try {
      const updateProductStockRepository = new UpdateProductStockRepository();
      const updateProductStockUseCase = new UpdateProductStockUseCase(
        updateProductStockRepository
      );
      const result = await updateProductStockUseCase.execute(data);
      return result;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const deleteProductSlice = createAsyncThunk(
  "product/delete",
  async (id: number, { rejectWithValue }) => {
    try {
      const deleteProductRepository = new DeleteProductRepository();
      const deleteProductUseCase = new DeleteProductUseCase(
        deleteProductRepository
      );
      await deleteProductUseCase.execute(id);
      return id;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

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
