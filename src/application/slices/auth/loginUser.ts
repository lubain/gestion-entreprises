import { LoginUserUsecase } from "@/domain/usecases/user/Login/LoginUserUsecase";
import {
  CreateAdminRepository,
  GetAdminByUserIdRepository,
} from "@/infrastructure/repositories/admins";
import { PasswordService } from "@/domain/services/PasswordService";
import { UserInformationProviderFactory } from "@/domain/services/UserInformationProviderFactory";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginCredential } from "@/domain/usecases/user/Login/type";
import {
  AuthenticateUserUsecase,
  GetUserByEmailUsecase,
  GetUserByIdUsecase,
} from "@/domain/usecases/user/userUsecase";
import AuthenticateUserRepository from "@/infrastructure/repositories/user/AuthenticateUserRepository";
import GetUserByEmailRepository from "@/infrastructure/repositories/user/GetUserByEmailRepository";
import GetUserByIdRepository from "@/infrastructure/repositories/user/GetUserByIdRepository";

// ===== Core Services =====
const passwordService = new PasswordService();

// ===== Authentication & User Management =====
// Base Repositories
const authRepositories = {
  authenticate: new AuthenticateUserRepository(),
  getByEmail: new GetUserByEmailRepository(),
  getById: new GetUserByIdRepository(),
};

// Authentication Usecases
const authUsecases = {
  authenticate: new AuthenticateUserUsecase(authRepositories.authenticate),
  getByEmail: new GetUserByEmailUsecase(authRepositories.getByEmail),
  getById: new GetUserByIdUsecase(authRepositories.getById),
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

// ===== Main Usecases =====
const loginUserUsecase = new LoginUserUsecase(
  authUsecases.getByEmail,
  authUsecases.authenticate,
  passwordService,
  userInformationProviderFactory
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials: loginCredential, { rejectWithValue }) => {
    try {
      const data = await loginUserUsecase.execute(credentials);

      if (data.success) {
        return data;
      } else {
        return rejectWithValue(data.error.message);
      }
    } catch (error) {
      return rejectWithValue(error.message || "Erreur inconnue");
    }
  }
);
