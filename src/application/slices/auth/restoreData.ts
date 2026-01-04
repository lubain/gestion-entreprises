import {
  CreateAdminRepository,
  GetAdminByUserIdRepository,
} from "@/infrastructure/repositories/admins";
import { UserInformationProviderFactory } from "@/domain/services/UserInformationProviderFactory";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserDataCollector } from "@/domain/services/UserDataCollector";
import { ErrorMessages } from "@/shared/constants/ErrorMessages";
import {
  GetAuthenticatedUserUsecase,
  GetUserByEmailUsecase,
} from "@/domain/usecases/user/userUsecase";
import GetUserByEmailRepository from "@/infrastructure/repositories/user/GetUserByEmailRepository";
import GetAuthenticatedUserRepository from "@/infrastructure/repositories/user/GetAuthenticatedUserRepository";

const authRepositories = {
  getByEmail: new GetUserByEmailRepository(),
  getAuthenticated: new GetAuthenticatedUserRepository(),
};

// Authentication Usecases
const authUsecases = {
  getByEmail: new GetUserByEmailUsecase(authRepositories.getByEmail),
  getAuthenticated: new GetAuthenticatedUserUsecase(
    authRepositories.getAuthenticated
  ),
};

// ===== Admin =====
const adminRepositories = {
  create: new CreateAdminRepository(),
  getByUserId: new GetAdminByUserIdRepository(),
};

// ===== Factories =====
const userInformationProviderFactory = new UserInformationProviderFactory(
  adminRepositories.getByUserId
);

const userDataCollector = new UserDataCollector(
  authUsecases.getAuthenticated,
  authUsecases.getByEmail,
  userInformationProviderFactory
);

export const restoreData = createAsyncThunk(
  "auth/restoreData",
  async (_, { rejectWithValue }) => {
    try {
      const data = await userDataCollector.execute();
      if (data.success) {
        return data;
      } else {
        return rejectWithValue(
          data?.error.message || ErrorMessages.RESTORE_USER_DATA_ERROR
        );
      }
    } catch (error) {
      return rejectWithValue(
        error.message || ErrorMessages.RESTORE_USER_DATA_ERROR
      );
    }
  }
);
