import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetUserByEmailUsecase } from "@/domain/usecases/user/userUsecase";
import GetUserByEmailRepository from "@/infrastructure/repositories/user/GetUserByEmailRepository";

// ===== Authentication & User Management =====
// Base Repositories
const authRepositories = {
  getByEmail: new GetUserByEmailRepository(),
};

// Authentication Usecases
const authUsecases = {
  getByEmail: new GetUserByEmailUsecase(authRepositories.getByEmail),
};

export const getUser = createAsyncThunk(
  "auth/getUser",
  async (email: string, { rejectWithValue }) => {
    try {
      const user = await authUsecases.getByEmail.execute(email);
      return user;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
