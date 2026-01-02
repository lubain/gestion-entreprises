import { createAsyncThunk } from "@reduxjs/toolkit";
import { Client } from "@/domain/models";
import { CreateClientRepository } from "@/infrastructure/repositories/client";
import { CreateClientUseCase } from "@/domain/usecases/client";

const createClientRepository = new CreateClientRepository();
const createClientUseCase = new CreateClientUseCase(createClientRepository);

export const createClientSlice = createAsyncThunk(
  "client/create",
  async (data: Omit<Client, "id">, { rejectWithValue }) => {
    try {
      const result = await createClientUseCase.execute(data);
      return result;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
