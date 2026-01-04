import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetAllInvoiceRepository } from "@/infrastructure/repositories/invoice";
import { GetAllInvoiceUseCase } from "@/domain/usecases/invoice";

const getAllInvoiceRepository = new GetAllInvoiceRepository();
const getAllInvoiceUseCase = new GetAllInvoiceUseCase(getAllInvoiceRepository);

export const getAllInvoiceSlices = createAsyncThunk(
  "invoice/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const result = await getAllInvoiceUseCase.execute();
      return result;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
