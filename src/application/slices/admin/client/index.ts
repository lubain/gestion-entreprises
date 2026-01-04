import { createSlice } from "@reduxjs/toolkit";
import { Client } from "@/domain/models";
import { createClientSlice } from "./createClientSlice";
import { getAllClientSlices } from "./getAllClientSlices";
import { updateClientSlice } from "./updateClientSlice";
import { deleteClientSlice } from "./deleteClientSlice";

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
