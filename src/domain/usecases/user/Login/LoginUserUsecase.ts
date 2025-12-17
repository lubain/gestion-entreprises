import { LoginUserDTO } from "@/domain/DTOS/LoginUserDTO";
import { IPasswordService } from "@/domain/interfaces/services/IPasswordService";
import { loginCredential } from "./type";
import { utilisateurs_role_enum } from "@/domain/models/enums";
import { ILoginUserUsecase } from "@/domain/interfaces/usecases/ILoginUserUsecase";
import { UserInformationProviderFactory } from "@/domain/services/UserInformationProviderFactory";
import { ErrorMessages } from "@/shared/constants/ErrorMessages";
import {
  IAuthenticateUserUsecase,
  IGetUserByEmailUsecase,
} from "@/domain/interfaces/usecases/user";

export class LoginUserUsecase implements ILoginUserUsecase {
  constructor(
    private readonly getUserByEmailUsecase: IGetUserByEmailUsecase,
    private readonly authenticateUserUsecase: IAuthenticateUserUsecase,
    private readonly passwordService: IPasswordService,
    private readonly userInformationProviderFactory: UserInformationProviderFactory
  ) {}

  async getUserInformations(role: utilisateurs_role_enum, id: number) {
    const provider = this.userInformationProviderFactory.createProvider(role);
    return provider.getUserInformation(id);
  }

  async isValidPassword(
    correctPassword: string,
    credentialPassword: string
  ): Promise<LoginUserDTO> {
    const isPasswordValid = await this.passwordService.comparePasswords(
      credentialPassword,
      correctPassword
    );

    if (!isPasswordValid) {
      return {
        userInformations: null,
        user: null,
        success: false,
        error: new Error(ErrorMessages.CREDENTIAL_INVALID),
      };
    }
  }

  async execute(credential: loginCredential): Promise<LoginUserDTO> {
    if (!navigator.onLine) {
      throw new Error("Aucune connexion internet");
    }

    const matchingUser = await this.getUserByEmailUsecase.execute(
      credential.email
    );

    if (!matchingUser) {
      throw new Error(ErrorMessages.CREDENTIAL_INVALID);
    }

    await this.authenticateUserUsecase.execute(credential);

    return {
      userInformations: await this.getUserInformations(
        matchingUser.role,
        matchingUser.id
      ),
      user: matchingUser,
      success: true,
      error: null,
    };
  }
}
