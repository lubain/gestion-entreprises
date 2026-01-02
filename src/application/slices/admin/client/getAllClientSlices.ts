import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetAllClientRepository } from "@/infrastructure/repositories/client";
import { GetAllClientUseCase } from "@/domain/usecases/client";

const getAllClientRepository = new GetAllClientRepository();
const getAllClientUseCase = new GetAllClientUseCase(getAllClientRepository);

export const getAllClientSlices = createAsyncThunk(
  "client/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const result = await getAllClientUseCase.execute();
      return result;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
