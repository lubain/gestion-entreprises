import { createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "@/domain/models";
import { CreateProductRepository } from "@/infrastructure/repositories/product";
import { CreateProductUseCase } from "@/domain/usecases/product";

const createProductRepository = new CreateProductRepository();
const createProductUseCase = new CreateProductUseCase(createProductRepository);

export const createProductSlice = createAsyncThunk(
  "product/create",
  async (data: Omit<Product, "id">, { rejectWithValue }) => {
    try {
      const result = await createProductUseCase.execute(data);
      return result;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
