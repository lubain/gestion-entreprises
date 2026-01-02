import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetAllProductRepository } from "@/infrastructure/repositories/product";
import { GetAllProductUseCase } from "@/domain/usecases/product";

const getAllProductRepository = new GetAllProductRepository();
const getAllProductUseCase = new GetAllProductUseCase(getAllProductRepository);

export const getAllProductSlices = createAsyncThunk(
  "product/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const result = await getAllProductUseCase.execute();
      return result;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
