import { createAsyncThunk } from "@reduxjs/toolkit";

import { GetAllExpenseRepository } from "@/infrastructure/repositories/expense";
import { GetAllExpenseUseCase } from "@/domain/usecases/expense";

const getAllExpenseRepository = new GetAllExpenseRepository();
const getAllExpenseUseCase = new GetAllExpenseUseCase(getAllExpenseRepository);

export const getAllExpenseSlices = createAsyncThunk(
  "expense/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const result = await getAllExpenseUseCase.execute();
      return result;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
