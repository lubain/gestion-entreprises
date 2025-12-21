import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Invoice } from "@/domain/models";

import {
  CreateInvoiceRepository,
  DeleteInvoiceRepository,
  GetAllInvoiceRepository,
  UpdateInvoiceRepository,
} from "@/infrastructure/repositories/invoice";
import {
  CreateInvoiceUseCase,
  DeleteInvoiceUseCase,
  GetAllInvoiceUseCase,
  UpdateInvoiceUseCase,
} from "@/domain/usecases/invoice";

interface InvoiceSliceState {
  invoices: Invoice[];
  selectedInvoiceSlice: Invoice | null;
  loading: boolean;
  error: string | null;
}

const initialState: InvoiceSliceState = {
  invoices: [],
  selectedInvoiceSlice: null,
  loading: false,
  error: null,
};

export const createInvoiceSlice = createAsyncThunk(
  "invoice/create",
  async (data: Omit<Invoice, "id">, { rejectWithValue }) => {
    try {
      const createInvoiceRepository = new CreateInvoiceRepository();
      const createInvoiceUseCase = new CreateInvoiceUseCase(
        createInvoiceRepository
      );
      const result = await createInvoiceUseCase.execute(data);
      return result;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const getAllInvoiceSlices = createAsyncThunk(
  "invoice/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const getAllInvoiceRepository = new GetAllInvoiceRepository();
      const getAllInvoiceUseCase = new GetAllInvoiceUseCase(
        getAllInvoiceRepository
      );
      const result = await getAllInvoiceUseCase.execute();
      return result;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const updateInvoiceSlice = createAsyncThunk(
  "invoice/update",
  async (
    { id, data }: { id: number; data: Partial<Invoice> },
    { rejectWithValue }
  ) => {
    try {
      const updateInvoiceRepository = new UpdateInvoiceRepository();
      const updateInvoiceUseCase = new UpdateInvoiceUseCase(
        updateInvoiceRepository
      );
      const result = await updateInvoiceUseCase.execute(id, data);
      return result;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const deleteInvoiceSlice = createAsyncThunk(
  "invoice/delete",
  async (id: number, { rejectWithValue }) => {
    try {
      const deleteInvoiceRepository = new DeleteInvoiceRepository();
      const deleteInvoiceUseCase = new DeleteInvoiceUseCase(
        deleteInvoiceRepository
      );
      await deleteInvoiceUseCase.execute(id);
      return id;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    setSelectedInvoiceSlice: (state, action) => {
      state.selectedInvoiceSlice = action.payload;
    },
    clearSelectedInvoiceSlice: (state) => {
      state.selectedInvoiceSlice = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createInvoiceSlice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createInvoiceSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.invoices.push(action.payload);
      })
      .addCase(createInvoiceSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Get All
      .addCase(getAllInvoiceSlices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllInvoiceSlices.fulfilled, (state, action) => {
        state.loading = false;
        state.invoices = action.payload;
      })
      .addCase(getAllInvoiceSlices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update
      .addCase(updateInvoiceSlice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateInvoiceSlice.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.invoices.findIndex(
          (am) => am.id === action.payload.id
        );
        if (index !== -1) {
          state.invoices[index] = action.payload;
        }
      })
      .addCase(updateInvoiceSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete
      .addCase(deleteInvoiceSlice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteInvoiceSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.invoices = state.invoices.filter(
          (am) => am.id !== Number(action.payload)
        );
      })
      .addCase(deleteInvoiceSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedInvoiceSlice, clearSelectedInvoiceSlice } =
  invoiceSlice.actions;
export default invoiceSlice.reducer;
