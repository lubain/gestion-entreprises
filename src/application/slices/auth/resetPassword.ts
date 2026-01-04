import { createAsyncThunk } from "@reduxjs/toolkit";
import { ResetPasswordUsecase } from "@/domain/usecases/user/ResetPasswordUsecase";
import ResetPasswordRepository from "@/infrastructure/repositories/user/ResetPasswordRepository";

const authRepositories = {
  resetPassword: new ResetPasswordRepository(),
};

const authUsecases = {
  resetPassword: new ResetPasswordUsecase(authRepositories.resetPassword),
};

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (email: string, { rejectWithValue }) => {
    try {
      await authUsecases.resetPassword.execute(email);
      return {
        success: true,
        message: "Lien de réinitialisation envoyé avec succès",
      };
    } catch (error) {
      return rejectWithValue(
        error.message || "Erreur lors de l'envoi du lien de réinitialisation"
      );
    }
  }
);
