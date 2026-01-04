import { createAsyncThunk } from "@reduxjs/toolkit";
import { Expense } from "@/domain/models";
import { UpdateExpenseRepository } from "@/infrastructure/repositories/expense";
import { UpdateExpenseUseCase } from "@/domain/usecases/expense";

const updateExpenseRepository = new UpdateExpenseRepository();
const updateExpenseUseCase = new UpdateExpenseUseCase(updateExpenseRepository);

export const updateExpenseSlice = createAsyncThunk(
  "expense/update",
  async (
    { id, data }: { id: number; data: Partial<Expense> },
    { rejectWithValue }
  ) => {
    try {
      const result = await updateExpenseUseCase.execute(id, data);
      return result;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
