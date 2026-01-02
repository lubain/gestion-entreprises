import { createAsyncThunk } from "@reduxjs/toolkit";
import { Client } from "@/domain/models";
import { UpdateClientRepository } from "@/infrastructure/repositories/client";
import { UpdateClientUseCase } from "@/domain/usecases/client";

const updateClientRepository = new UpdateClientRepository();
const updateClientUseCase = new UpdateClientUseCase(updateClientRepository);

export const updateClientSlice = createAsyncThunk(
  "client/update",
  async (
    { id, data }: { id: number; data: Partial<Client> },
    { rejectWithValue }
  ) => {
    try {
      const result = await updateClientUseCase.execute(id, data);
      return result;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
