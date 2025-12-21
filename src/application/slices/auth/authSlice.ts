import { administrateurs, Utilisateur } from "@/domain/models";
import { LoginUserUsecase } from "@/domain/usecases/user/Login/LoginUserUsecase";
import {
  CreateAdminRepository,
  GetAdminByUserIdRepository,
} from "@/infrastructure/repositories/admins";

import { PasswordService } from "@/domain/services/PasswordService";
import { UserInformationProviderFactory } from "@/domain/services/UserInformationProviderFactory";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@supabase/supabase-js";
import { loginCredential } from "@/domain/usecases/user/Login/type";
import { RoleValidator } from "@/domain/services/RoleValidator";
import { MatriculeGenerator } from "@/domain/services/MatriculeGenerator";
import { UserDataCollector } from "@/domain/services/UserDataCollector";
import { ErrorMessages } from "@/shared/constants/ErrorMessages";

import {
  AuthenticateUserUsecase,
  CreateAuthentificationUserUsecase,
  CreateUserUsecase,
  DeleteAuthentificationUserUsecase,
  DeleteUserUsecase,
  EditUserUsecase,
  GetAuthenticatedUserUsecase,
  GetUserByEmailUsecase,
  GetUserByIdUsecase,
  GetUsersUsecase,
  IsEmailRegisteredUsecase,
  LogOutUserUsecase,
  SendVerificationEmailUsecase,
} from "@/domain/usecases/user/userUsecase";
import { ResetPasswordUsecase } from "@/domain/usecases/user/ResetPasswordUsecase";
import AuthenticateUserRepository from "@/infrastructure/repositories/user/AuthenticateUserRepository";
import CreateUserRepository from "@/infrastructure/repositories/user/CreateUserRepository";
import DeleteUserRepository from "@/infrastructure/repositories/user/DeleteUserRepository";
import DeleteAuthentificationUserRepository from "@/infrastructure/repositories/user/DeleteAuthentificationUserRepository";
import GetUserByEmailRepository from "@/infrastructure/repositories/user/GetUserByEmailRepository";
import GetUserByIdRepository from "@/infrastructure/repositories/user/GetUserByIdRepository";
import EditUserRepository from "@/infrastructure/repositories/user/EditUserRepository";
import GetUsersRepository from "@/infrastructure/repositories/user/GetUsersRepository";
import IsEmailRegisteredRepository from "@/infrastructure/repositories/user/IsEmailRegisteredRepository";
import LogOutUserRepository from "@/infrastructure/repositories/user/LogOutUserRepository";
import CreateAuthentificationUserRepository from "@/infrastructure/repositories/user/CreateAuthentificationUserRepository";
import GetAuthenticatedUserRepository from "@/infrastructure/repositories/user/GetAuthenticatedUserRepository";
import SendVerificationEmailRepository from "@/infrastructure/repositories/user/SendVerificationEmailRepository";
import ResetPasswordRepository from "@/infrastructure/repositories/user/ResetPasswordRepository";

// ===== Core Services =====
const passwordService = new PasswordService();
const roleValidator = new RoleValidator();
const matriculeGenerator = new MatriculeGenerator();

// ===== Authentication & User Management =====
// Base Repositories
const authRepositories = {
  authenticate: new AuthenticateUserRepository(),
  create: new CreateUserRepository(),
  createAuth: new CreateAuthentificationUserRepository(),
  delete: new DeleteUserRepository(),
  deleteAuth: new DeleteAuthentificationUserRepository(),
  getByEmail: new GetUserByEmailRepository(),
  getById: new GetUserByIdRepository(),
  edit: new EditUserRepository(),
  getAll: new GetUsersRepository(),
  isEmailRegistered: new IsEmailRegisteredRepository(),
  logOut: new LogOutUserRepository(),
  getAuthenticated: new GetAuthenticatedUserRepository(),
  sendVerificationEmailRepository: new SendVerificationEmailRepository(),
  resetPassword: new ResetPasswordRepository(),
};

// Authentication Usecases
const authUsecases = {
  authenticate: new AuthenticateUserUsecase(authRepositories.authenticate),
  create: new CreateUserUsecase(authRepositories.create, passwordService),
  createAuth: new CreateAuthentificationUserUsecase(
    authRepositories.createAuth
  ),
  delete: new DeleteUserUsecase(authRepositories.delete),
  deleteAuth: new DeleteAuthentificationUserUsecase(
    authRepositories.deleteAuth
  ),
  getByEmail: new GetUserByEmailUsecase(authRepositories.getByEmail),
  getById: new GetUserByIdUsecase(authRepositories.getById),
  edit: new EditUserUsecase(authRepositories.edit),
  getAll: new GetUsersUsecase(authRepositories.getAll),
  isEmailRegistered: new IsEmailRegisteredUsecase(
    authRepositories.isEmailRegistered
  ),
  logOut: new LogOutUserUsecase(authRepositories.logOut),
  getAuthenticated: new GetAuthenticatedUserUsecase(
    authRepositories.getAuthenticated
  ),
  sendVerificationEmailUsecase: new SendVerificationEmailUsecase(
    authRepositories.sendVerificationEmailRepository
  ),
  resetPassword: new ResetPasswordUsecase(authRepositories.resetPassword),
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

const userDataCollector = new UserDataCollector(
  authUsecases.getAuthenticated,
  authUsecases.getByEmail,
  userInformationProviderFactory
);

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
