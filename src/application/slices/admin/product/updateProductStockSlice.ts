import { createAsyncThunk } from "@reduxjs/toolkit";
import { UpdateProductStockRepository } from "@/infrastructure/repositories/product";
import { UpdateProductStockUseCase } from "@/domain/usecases/product";

const updateProductStockRepository = new UpdateProductStockRepository();
const updateProductStockUseCase = new UpdateProductStockUseCase(
  updateProductStockRepository
);

export const updateProductStockSlice = createAsyncThunk(
  "product/updateStock",
  async (data: { id: number; newStock: number }[], { rejectWithValue }) => {
    try {
      const result = await updateProductStockUseCase.execute(data);
      return result;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
