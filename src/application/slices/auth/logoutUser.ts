import { createAsyncThunk } from "@reduxjs/toolkit";
import { LogOutUserUsecase } from "@/domain/usecases/user/userUsecase";
import LogOutUserRepository from "@/infrastructure/repositories/user/LogOutUserRepository";

const authRepositories = {
  logOut: new LogOutUserRepository(),
};

const authUsecases = {
  logOut: new LogOutUserUsecase(authRepositories.logOut),
};

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await authUsecases.logOut.execute();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
