import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Expense } from "@/domain/models";

import {
  CreateExpenseRepository,
  DeleteExpenseRepository,
  GetAllExpenseRepository,
  UpdateExpenseRepository,
} from "@/infrastructure/repositories/expense";
import {
  CreateExpenseUseCase,
  DeleteExpenseUseCase,
  GetAllExpenseUseCase,
  UpdateExpenseUseCase,
} from "@/domain/usecases/expense";

interface ExpenseSliceState {
  expenses: Expense[];
  selectedExpenseSlice: Expense | null;
  loading: boolean;
  error: string | null;
}

const initialState: ExpenseSliceState = {
  expenses: [],
  selectedExpenseSlice: null,
  loading: false,
  error: null,
};

export const createExpenseSlice = createAsyncThunk(
  "expense/create",
  async (data: Omit<Expense, "id">, { rejectWithValue }) => {
    try {
      const createExpenseRepository = new CreateExpenseRepository();
      const createExpenseUseCase = new CreateExpenseUseCase(
        createExpenseRepository
      );
      const result = await createExpenseUseCase.execute(data);
      return result;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const getAllExpenseSlices = createAsyncThunk(
  "expense/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const getAllExpenseRepository = new GetAllExpenseRepository();
      const getAllExpenseUseCase = new GetAllExpenseUseCase(
        getAllExpenseRepository
      );
      const result = await getAllExpenseUseCase.execute();
      return result;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const updateExpenseSlice = createAsyncThunk(
  "expense/update",
  async (
    { id, data }: { id: number; data: Partial<Expense> },
    { rejectWithValue }
  ) => {
    try {
      const updateExpenseRepository = new UpdateExpenseRepository();
      const updateExpenseUseCase = new UpdateExpenseUseCase(
        updateExpenseRepository
      );
      const result = await updateExpenseUseCase.execute(id, data);
      return result;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const deleteExpenseSlice = createAsyncThunk(
  "expense/delete",
  async (id: number, { rejectWithValue }) => {
    try {
      const deleteExpenseRepository = new DeleteExpenseRepository();
      const deleteExpenseUseCase = new DeleteExpenseUseCase(
        deleteExpenseRepository
      );
      await deleteExpenseUseCase.execute(id);
      return id;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    setSelectedExpenseSlice: (state, action) => {
      state.selectedExpenseSlice = action.payload;
    },
    clearSelectedExpenseSlice: (state) => {
      state.selectedExpenseSlice = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createExpenseSlice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createExpenseSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses.push(action.payload);
      })
      .addCase(createExpenseSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Get All
      .addCase(getAllExpenseSlices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllExpenseSlices.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = action.payload;
      })
      .addCase(getAllExpenseSlices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update
      .addCase(updateExpenseSlice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateExpenseSlice.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.expenses.findIndex(
          (am) => am.id === action.payload.id
        );
        if (index !== -1) {
          state.expenses[index] = action.payload;
        }
      })
      .addCase(updateExpenseSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete
      .addCase(deleteExpenseSlice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteExpenseSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = state.expenses.filter(
          (am) => am.id !== Number(action.payload)
        );
      })
      .addCase(deleteExpenseSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedExpenseSlice, clearSelectedExpenseSlice } =
  expenseSlice.actions;
export default expenseSlice.reducer;
