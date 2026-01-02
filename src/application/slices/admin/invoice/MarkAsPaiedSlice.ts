import { createAsyncThunk } from "@reduxjs/toolkit";
import { MarkAsPaiedRepository } from "@/infrastructure/repositories/invoice";
import { MarkAsPaiedUseCase } from "@/domain/usecases/invoice";

const markAsPaiedRepository = new MarkAsPaiedRepository();
const markAsPaiedUseCase = new MarkAsPaiedUseCase(markAsPaiedRepository);

export const MarkAsPaiedSlice = createAsyncThunk(
  "invoice/markAsPaied",
  async (id: number, { rejectWithValue }) => {
    try {
      const result = await markAsPaiedUseCase.execute(id);
      return result;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
