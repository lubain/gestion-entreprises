import { createSlice } from "@reduxjs/toolkit";
import { Expense } from "@/domain/models";
import { createExpenseSlice } from "./createExpenseSlice";
import { getAllExpenseSlices } from "./getAllExpenseSlices";
import { updateExpenseSlice } from "./updateExpenseSlice";
import { deleteExpenseSlice } from "./deleteExpenseSlice";

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
