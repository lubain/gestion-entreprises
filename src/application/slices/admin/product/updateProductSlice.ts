import { createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "@/domain/models";
import { UpdateProductRepository } from "@/infrastructure/repositories/product";
import { UpdateProductUseCase } from "@/domain/usecases/product";

const updateProductRepository = new UpdateProductRepository();
const updateProductUseCase = new UpdateProductUseCase(updateProductRepository);

export const updateProductSlice = createAsyncThunk(
  "product/update",
  async (
    { id, data }: { id: number; data: Partial<Product> },
    { rejectWithValue }
  ) => {
    try {
      const result = await updateProductUseCase.execute(id, data);
      return result;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
