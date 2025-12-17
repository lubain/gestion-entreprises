import { LoginUserDTO } from "../DTOS";
import { IUserDataCollector } from "../interfaces/services/IUserDataCollector";
import {
  IGetAuthenticatedUserUsecase,
  IGetUserByEmailUsecase,
} from "../interfaces/usecases/user";
import { Utilisateur } from "../models";
import { UserInformationProviderFactory } from "./UserInformationProviderFactory";

const NO_USER_RETURN_VAL: LoginUserDTO = {
  success: false,
  user: null,
  userInformations: null,
  error: new Error("Aucune utilisateur connectee"),
};

export class UserDataCollector implements IUserDataCollector {
  constructor(
    private getAuthenticatedUserUsecase: IGetAuthenticatedUserUsecase,
    private getUserByEmailUsecase: IGetUserByEmailUsecase,
    private userInformationsFactory: UserInformationProviderFactory,
  ) {}

  async execute(): Promise<LoginUserDTO> {
    try {
      const authenticatedUser = await this.getAuthenticatedUserUsecase
        .execute();

      if (!authenticatedUser && !authenticatedUser.email) {
        return NO_USER_RETURN_VAL;
      }

      const user: Utilisateur = await this.getUserByEmailUsecase.execute(
        authenticatedUser.email,
      );

      if (!user) return NO_USER_RETURN_VAL;

      const userInformationProvider = this.userInformationsFactory
        .createProvider(user.role);

      const userData = await userInformationProvider.getUserInformation(
        user.id,
      );

      if (!userData) return NO_USER_RETURN_VAL;

      return {
        success: true,
        user: user,
        userInformations: userData,
      };
    } catch (error) {
      return NO_USER_RETURN_VAL;
    }
  }
}
