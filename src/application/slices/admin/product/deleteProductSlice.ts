import { createAsyncThunk } from "@reduxjs/toolkit";
import { DeleteProductRepository } from "@/infrastructure/repositories/product";
import { DeleteProductUseCase } from "@/domain/usecases/product";

const deleteProductRepository = new DeleteProductRepository();
const deleteProductUseCase = new DeleteProductUseCase(deleteProductRepository);

export const deleteProductSlice = createAsyncThunk(
  "product/delete",
  async (id: number, { rejectWithValue }) => {
    try {
      await deleteProductUseCase.execute(id);
      return id;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
