import { createAsyncThunk } from "@reduxjs/toolkit";
import { Expense } from "@/domain/models";
import { CreateExpenseRepository } from "@/infrastructure/repositories/expense";
import { CreateExpenseUseCase } from "@/domain/usecases/expense";

const createExpenseRepository = new CreateExpenseRepository();
const createExpenseUseCase = new CreateExpenseUseCase(createExpenseRepository);

export const createExpenseSlice = createAsyncThunk(
  "expense/create",
  async (data: Omit<Expense, "id">, { rejectWithValue }) => {
    try {
      const result = await createExpenseUseCase.execute(data);
      return result;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
