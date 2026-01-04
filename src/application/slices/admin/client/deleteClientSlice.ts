import { createAsyncThunk } from "@reduxjs/toolkit";
import { DeleteClientRepository } from "@/infrastructure/repositories/client";
import { DeleteClientUseCase } from "@/domain/usecases/client";

const deleteClientRepository = new DeleteClientRepository();
const deleteClientUseCase = new DeleteClientUseCase(deleteClientRepository);

export const deleteClientSlice = createAsyncThunk(
  "client/delete",
  async (id: number, { rejectWithValue }) => {
    try {
      await deleteClientUseCase.execute(id);
      return id;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
