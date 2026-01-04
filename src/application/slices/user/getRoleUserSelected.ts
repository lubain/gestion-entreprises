import { GetRoleUserUsecase } from "@/domain/usecases/user";
import { GetRoleUserRepository } from "@/infrastructure/repositories/user/GetRoleUserRepository";
import { createAsyncThunk } from "@reduxjs/toolkit";

const getRoleUserRepository = new GetRoleUserRepository();
const getRoleUserUsecase = new GetRoleUserUsecase(getRoleUserRepository);

export const getRoleUserSelected = createAsyncThunk(
  "user/getRoleUserSelected",
  async (utilisateur_id: number, { rejectWithValue }) => {
    try {
      const role = await getRoleUserUsecase.execute(utilisateur_id);
      return role;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
