import { createSlice } from "@reduxjs/toolkit";
import { Invoice } from "@/domain/models";
import { createInvoiceSlice } from "./createInvoiceSlice";
import { getAllInvoiceSlices } from "./getAllClientSlices";
import { updateInvoiceSlice } from "./updateInvoiceSlice";
import { deleteInvoiceSlice } from "./deleteInvoiceSlice";

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
