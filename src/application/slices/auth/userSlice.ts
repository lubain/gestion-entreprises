import { Utilisateur } from "@/domain/models";
import { utilisateurs_role_enum } from "@/domain/models/enums";
import { GetRoleUserUsecase } from "@/domain/usecases/user";
import { GetRoleUserRepository } from "@/infrastructure/repositories/user/GetRoleUserRepository";
import { SupabaseError } from "@/infrastructure/supabase/supabaseError";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
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

export const getRoleUserSelected = createAsyncThunk(
  "user/getRoleUserSelected",
  async (utilisateur_id: number, { rejectWithValue }) => {
    try {
      const getRoleUserRepository = new GetRoleUserRepository();
      const getRoleUserUsecase = new GetRoleUserUsecase(getRoleUserRepository);
      const role = await getRoleUserUsecase.execute(utilisateur_id);
      return role;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

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
