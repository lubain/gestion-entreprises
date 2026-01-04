import { createAsyncThunk } from "@reduxjs/toolkit";
import { DeleteExpenseRepository } from "@/infrastructure/repositories/expense";
import { DeleteExpenseUseCase } from "@/domain/usecases/expense";

const deleteExpenseRepository = new DeleteExpenseRepository();
const deleteExpenseUseCase = new DeleteExpenseUseCase(deleteExpenseRepository);

export const deleteExpenseSlice = createAsyncThunk(
  "expense/delete",
  async (id: number, { rejectWithValue }) => {
    try {
      await deleteExpenseUseCase.execute(id);
      return id;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
