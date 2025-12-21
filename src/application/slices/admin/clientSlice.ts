import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Client } from "@/domain/models";

import {
  CreateClientRepository,
  DeleteClientRepository,
  GetAllClientRepository,
  UpdateClientRepository,
} from "@/infrastructure/repositories/client";
import {
  CreateClientUseCase,
  DeleteClientUseCase,
  GetAllClientUseCase,
  UpdateClientUseCase,
} from "@/domain/usecases/client";

interface ClientSliceState {
  clients: Client[];
  selectedClientSlice: Client | null;
  loading: boolean;
  error: string | null;
}

const initialState: ClientSliceState = {
  clients: [],
  selectedClientSlice: null,
  loading: false,
  error: null,
};

export const createClientSlice = createAsyncThunk(
  "client/create",
  async (data: Omit<Client, "id">, { rejectWithValue }) => {
    try {
      const createClientRepository = new CreateClientRepository();
      const createClientUseCase = new CreateClientUseCase(
        createClientRepository
      );
      const result = await createClientUseCase.execute(data);
      return result;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const getAllClientSlices = createAsyncThunk(
  "client/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const getAllClientRepository = new GetAllClientRepository();
      const getAllClientUseCase = new GetAllClientUseCase(
        getAllClientRepository
      );
      const result = await getAllClientUseCase.execute();
      return result;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const updateClientSlice = createAsyncThunk(
  "client/update",
  async (
    { id, data }: { id: number; data: Partial<Client> },
    { rejectWithValue }
  ) => {
    try {
      const updateClientRepository = new UpdateClientRepository();
      const updateClientUseCase = new UpdateClientUseCase(
        updateClientRepository
      );
      const result = await updateClientUseCase.execute(id, data);
      return result;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const deleteClientSlice = createAsyncThunk(
  "client/delete",
  async (id: number, { rejectWithValue }) => {
    try {
      const deleteClientRepository = new DeleteClientRepository();
      const deleteClientUseCase = new DeleteClientUseCase(
        deleteClientRepository
      );
      await deleteClientUseCase.execute(id);
      return id;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    setSelectedClientSlice: (state, action) => {
      state.selectedClientSlice = action.payload;
    },
    clearSelectedClientSlice: (state) => {
      state.selectedClientSlice = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createClientSlice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createClientSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.clients.push(action.payload);
      })
      .addCase(createClientSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Get All
      .addCase(getAllClientSlices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllClientSlices.fulfilled, (state, action) => {
        state.loading = false;
        state.clients = action.payload;
      })
      .addCase(getAllClientSlices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update
      .addCase(updateClientSlice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateClientSlice.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.clients.findIndex(
          (am) => am.id === action.payload.id
        );
        if (index !== -1) {
          state.clients[index] = action.payload;
        }
      })
      .addCase(updateClientSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete
      .addCase(deleteClientSlice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteClientSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.clients = state.clients.filter(
          (am) => am.id !== Number(action.payload)
        );
      })
      .addCase(deleteClientSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedClientSlice, clearSelectedClientSlice } =
  clientSlice.actions;
export default clientSlice.reducer;
