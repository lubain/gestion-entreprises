import { createAsyncThunk } from "@reduxjs/toolkit";
import { Invoice } from "@/domain/models";
import { CreateInvoiceRepository } from "@/infrastructure/repositories/invoice";
import { CreateInvoiceUseCase } from "@/domain/usecases/invoice";

const createInvoiceRepository = new CreateInvoiceRepository();
const createInvoiceUseCase = new CreateInvoiceUseCase(createInvoiceRepository);

export const createInvoiceSlice = createAsyncThunk(
  "invoice/create",
  async (data: Omit<Invoice, "id">, { rejectWithValue }) => {
    try {
      const result = await createInvoiceUseCase.execute(data);
      return result;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
