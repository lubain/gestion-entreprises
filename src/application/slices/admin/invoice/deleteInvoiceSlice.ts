import { createAsyncThunk } from "@reduxjs/toolkit";
import { DeleteInvoiceRepository } from "@/infrastructure/repositories/invoice";
import { DeleteInvoiceUseCase } from "@/domain/usecases/invoice";

const deleteInvoiceRepository = new DeleteInvoiceRepository();
const deleteInvoiceUseCase = new DeleteInvoiceUseCase(deleteInvoiceRepository);

export const deleteInvoiceSlice = createAsyncThunk(
  "invoice/delete",
  async (id: number, { rejectWithValue }) => {
    try {
      await deleteInvoiceUseCase.execute(id);
      return id;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
