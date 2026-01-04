import { utilisateurs_role_enum } from "@/domain/models/enums";
import { SupabaseError } from "@/infrastructure/supabase/supabaseError";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getRoleUserSelected } from "./getRoleUserSelected";

interface UserState {
  roleUserSelected: utilisateurs_role_enum | null;
  loading: boolean;
  error: SupabaseError | null;
}

const initialState: UserState = {
  roleUserSelected: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<SupabaseError>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRoleUserSelected.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRoleUserSelected.fulfilled, (state, action) => {
        state.loading = false;
        state.roleUserSelected = action.payload;
      })
      .addCase(getRoleUserSelected.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as SupabaseError;
      });
  },
});

export const { setError, setLoading } = userSlice.actions;
export default userSlice.reducer;
