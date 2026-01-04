import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ErrorMessages } from "@/shared/constants/ErrorMessages";
import { SendVerificationEmailUsecase } from "@/domain/usecases/user/userUsecase";
import SendVerificationEmailRepository from "@/infrastructure/repositories/user/SendVerificationEmailRepository";

const authRepositories = {
  sendVerificationEmailRepository: new SendVerificationEmailRepository(),
};

const authUsecases = {
  sendVerificationEmailUsecase: new SendVerificationEmailUsecase(
    authRepositories.sendVerificationEmailRepository
  ),
};

export const resendConfirmationEmail = createAsyncThunk(
  "auth/resendConfirmationEmail",
  async (email: string, { rejectWithValue }) => {
    try {
      await authUsecases.sendVerificationEmailUsecase.execute(email);
    } catch (error) {
      return rejectWithValue(
        error.message || ErrorMessages.RESEND_VALIDATION_EMAIL_ERROR
      );
    }
  }
);
