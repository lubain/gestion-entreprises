import { createAsyncThunk } from "@reduxjs/toolkit";
import { Invoice } from "@/domain/models";
import { UpdateInvoiceRepository } from "@/infrastructure/repositories/invoice";
import { UpdateInvoiceUseCase } from "@/domain/usecases/invoice";

const updateInvoiceRepository = new UpdateInvoiceRepository();
const updateInvoiceUseCase = new UpdateInvoiceUseCase(updateInvoiceRepository);

export const updateInvoiceSlice = createAsyncThunk(
  "invoice/update",
  async (
    { id, data }: { id: number; data: Partial<Invoice> },
    { rejectWithValue }
  ) => {
    try {
      const result = await updateInvoiceUseCase.execute(id, data);
      return result;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
