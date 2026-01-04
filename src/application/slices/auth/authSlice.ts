import { administrateurs, Utilisateur } from "@/domain/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@supabase/supabase-js";
import { loginUser } from "./loginUser";
import { logoutUser } from "./logoutUser";
import { getUser } from "./getUser";
import { restoreData } from "./restoreData";
import { resendConfirmationEmail } from "./resendConfirmationEmail";

interface AuthState {
  authData: User | null;
  user: Utilisateur | null;
  userData: administrateurs | null;
  loading: boolean;
  isOpen: boolean;
  error: string | null;
  verificationCode: number[];
}

// Initial state
const initialState: AuthState = {
  authData: null,
  user: null,
  userData: null,
  verificationCode: [0, 0, 0, 0], // TODO: A utiliser plustard
  loading: false,
  isOpen: false,
  error: null,
};

// Slice pour gérer l'authentification
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Utilisateur | null>) => {
      state.user = action.payload;
    },
    setUserData: (state, action: PayloadAction<administrateurs | null>) => {
      state.userData = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setVerificationCode: (state, action: PayloadAction<number[]>) => {
      state.verificationCode = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.userData = action.payload.userInformations;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        Object.assign(state, initialState);
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(restoreData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(restoreData.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.userData = action.payload.userInformations;
        state.loading = false;
      })
      .addCase(restoreData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(resendConfirmationEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resendConfirmationEmail.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resendConfirmationEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setUser,
  setError,
  setLoading,
  setUserData,
  setIsOpen,
  setVerificationCode,
} = authSlice.actions;

export default authSlice.reducer;
